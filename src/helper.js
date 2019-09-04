import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === '') return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`,
  });

  this.setState({
    newMessage: '',
  });
}

function toggleShow(){
  const {showForm} = this.state;
  this.setState({
    showForm: !showForm
  });
}

function toggleShowDmList(){
  const {showForm} = this.state;
  this.setState({
    showDmList: !showForm
  });
  console.log(this.ShowDmList)
}

function handleInput(event) {
  if(event.target === undefined){
    console.log(event)
    this.setState({
      userIds: event,
    });
  }else{
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }
}

function connectToRoom(id = 'afa1c12e-b196-4bb4-b940-a1af439328be') {
  const { currentUser } = this.state;

  this.setState({
    messages: [],
    showForm: false,
    showDmList: false
  });

  return currentUser
    .subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message],
          });
        },
        onPresenceChanged: () => {
          const { currentRoom } = this.state;
          this.setState({
            roomUsers: currentRoom.users.sort(a => {
              if (a.presence.state === 'online') return -1;

              return 1;
            }),
          });
        },
      },
    })
    .then(currentRoom => {
      const roomName =
        currentRoom.customData && currentRoom.customData.isDirectMessage
          ? currentRoom.customData.userIds.filter(
              id => id !== currentUser.id
            )[0]
          : currentRoom.name;

      this.setState({
        currentRoom,
        roomUsers: currentRoom.users,
        rooms: currentUser.rooms,
        roomName,
      });
    })
    .catch(console.error);
}

function connectToChatkit(event) {
  event.preventDefault();

  const { userId } = this.state;

  if (userId === null || userId.trim() === '') {
    alert('Invalid userId');
    return;
  }

  this.setState({
    isLoading: true,
  });

  axios.post('https://dheeraj-chat-app-backend.herokuapp.com/get_users')
    .then((users) => {
      let user_list = users.data
      this.setState({
        users: user_list
      });
    })

  axios
    .post('https://dheeraj-chat-app-backend.herokuapp.com/users', { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'https://dheeraj-chat-app-backend.herokuapp.com/authenticate',
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:4811d398-69b5-472e-bfcf-e24d61e97f14',
        userId,
        tokenProvider,
      });

      return chatManager
        .connect({
          onAddedToRoom: room => {
            const { rooms } = this.state;
            this.setState({
              rooms: [...rooms, room],
            });
          },
        })
        .then(currentUser => {
          this.setState(
            {
              currentUser,
              showLogin: false,
              isLoading: false,
              rooms: currentUser.rooms
            },
            () => connectToRoom.call(this)
          );
        });
    })
    .catch(console.error);
}

function createPrivateRoom(id) {
  const { currentUser, rooms } = this.state;
  const roomName = `${currentUser.id}_${id}`;

  const isPrivateChatCreated = rooms.filter(room => {
    if (room.customData && room.customData.isDirectMessage) {
      const arr = [currentUser.id, id];
      const { userIds } = room.customData;

      if (arr.sort().join('') === userIds.sort().join('')) {
        return {
          room,
        };
      }
    }

    return false;
  });

  if (isPrivateChatCreated.length > 0) {
    return Promise.resolve(isPrivateChatCreated[0]);
  }

  return currentUser.createRoom({
    name: `${roomName}`,
    private: true,
    addUserIds: [`${id}`],
    customData: {
      isDirectMessage: true,
      userIds: [currentUser.id, id],
    },
  });
}

function createGroupRoom() {
  const name = this.state.channelName;
  const ids = this.state.userIds;
  const { currentUser, rooms } = this.state;
  const roomName = `${name}`;

  const isPrivateChatCreated = rooms.filter(room => {
    if (room.customData && room.customData.isDirectMessage) {
      const arr = ids.concat(currentUser.id);
      const { userIds } = room.customData;

      if (arr.sort().join('') === userIds.sort().join('')) {
        return {
          room,
        };
      }
    }

    return false;
  });

  if (isPrivateChatCreated.length > 0) {
    return Promise.resolve(isPrivateChatCreated[0]);
  }

  return currentUser.createRoom({
    name: roomName,
    private: true,
    addUserIds: ids
  });
}

function sendDM(id) {
  createPrivateRoom.call(this, id).then(room => {
    connectToRoom.call(this, room.id);
  });
}

function sendGroupMessage() {
  createGroupRoom.call(this).then(room => {
    connectToRoom.call(this, room.id);
  });
}

export { sendMessage, handleInput, connectToRoom, connectToChatkit, sendDM, sendGroupMessage, toggleShow, toggleShowDmList };

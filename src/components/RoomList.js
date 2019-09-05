import React from 'react';
import Proptypes from 'prop-types';
import CreateRoomForm from './CreateRoomForm';
import CreatePrivateRoomForm from './CreatePrivateRoomForm';

const RoomList = props => {
  const { rooms, currentRoom, connectToRoom, currentUser, sendDM, sendGroupMessage, users, handleInput, channelName, toggleShow, showForm, userIds, dmUser, showDmList, toggleShowDmList } = props;
  const groupRoomList = []
  const privateChatRoomList = []
  rooms.forEach(room => {
    const roomIcon = !room.isPrivate ? '#' : '';
    const isRoomActive = room.id === currentRoom.id ? 'active' : '';
    const chat_list_name = (
      <li
        className={isRoomActive}
        key={room.id}
        onClick={() => connectToRoom(room.id)}
      >
        <span className="room-icon">{roomIcon}</span>
        {room.customData && room.customData.isDirectMessage ? (
          <span className="room-name">
            {room.customData.userIds.filter(id => id !== currentUser.id)[0]}
          </span>
        ) : (
          <span className="room-name">{room.name}</span>
        )}
        {room.unreadCount > 0 ? (
          <span className="room-unread">{room.unreadCount}</span>
        ): null}
      </li>
    );
    if(room.customData && room.customData.isDirectMessage){
      privateChatRoomList.push(chat_list_name)
    }else{
      groupRoomList.push(chat_list_name)
    }
  });
  return (
    <div className="rooms">
      <div className="section">
        <div>
          Groups
          <span className="create-conv">
            <a
              onClick={() => toggleShow()}
            >
            Add
            </a>
          </span>
          {showForm ?
            (<CreateRoomForm sendGroupMessage={sendGroupMessage} users={users} handleInput={handleInput} channelName={channelName} userIds={userIds} showDmList={showDmList} toggleShow={toggleShow}/>) : null
          }
        </div>
        <ul className="chat-rooms">{groupRoomList}</ul>
      </div>
      <div className="section">
        <div>
          Private Chats
          <span className="create-conv">
            <a
              onClick={() => toggleShowDmList()}
            >
            Add
            </a>
          </span>
          {showDmList ?
            (<CreatePrivateRoomForm sendGroupMessage={sendDM} users={users} handleInput={handleInput} dmUser={dmUser} currentUser={currentUser}/>) : null
          }
        </div>
        <ul className="chat-rooms">{privateChatRoomList}</ul>
      </div>
    </div>
  );
};

RoomList.propTypes = {
  rooms: Proptypes.array.isRequired,
  currentRoom: Proptypes.object.isRequired,
  connectToRoom: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired,
  sendDM: Proptypes.func.isRequired,
  sendGroupMessage: Proptypes.func.isRequired,
  handleInput: Proptypes.func.isRequired,
};

export default RoomList;

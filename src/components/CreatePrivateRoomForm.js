import React from 'react'
import Multiselect from 'multiselect-dropdown-react';

const CreatePrivateRoomForm = props => {
  const { sendGroupMessage, users, handleInput, dmUser, currentUser } = props;
  const user_list = users.map(user => {
    return (
      <li className="room-member" key={user.name}>
        <div>
          <span>{user.name}</span>
        </div>
        {currentUser.id !== user.id ? (
          <button
            onClick={() => sendGroupMessage(user.id)}
            title={`Send ${user.name} a direct message`}
            className="send-dm"
          >
            +
          </button>
        ) : null}
      </li>
    );
  });

  return (
    <div className="room-users">
      <ul>{user_list}</ul>
    </div>
  );
};

export default CreatePrivateRoomForm;

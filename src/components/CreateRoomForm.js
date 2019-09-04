import React from 'react'
import Multiselect from 'multiselect-dropdown-react';

const CreateRoomForm = props => {
  const { sendGroupMessage, users, handleInput, channelName, userIds, toggleShow } = props;
  const options = users.map(function(user){
    return {name: user["id"], value: user['id']}
  })

  return (
    <section className="chat-screen">
      <label className="username-label" htmlFor="username">
        Group Channel Name
      </label>
      <input
        id="name"
        autoFocus
        type="text"
        name="channelName"
        value={channelName}
        onChange={handleInput}
        placeholder="Enter your username"
      />
      <div className="custom-select">
        <Multiselect options={options} name="userIds" value={userIds} onSelectOptions={handleInput} />
      </div>
      {userIds.length > 0 ? (<button type="submit" className="submit-btn" onClick={() => sendGroupMessage()}>
        Submit
      </button>) : null}
      <button onClick={() => toggleShow()}>Cancel</button>
    </section>
  );
};

export default CreateRoomForm;

import React from "react";
import "./Message.css";

const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`message_text ${classs}`}>
        <p>
          {user}: {message}
        </p>
      </div>
    );
  } else {
    return (
      <div className={`message_text ${classs}`}>
        <p>You: {message}</p>
      </div>
    );
  }
};

export default Message;

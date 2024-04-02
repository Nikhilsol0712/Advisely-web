import React from "react";

const Message = ({ message, flex, bg }) => {
  console.log("message===", message);
  return (
    <div className={`p-1   flex ${flex} gap-1`}>
      <img  alt="" className="h-6 w-6 rounded-full" src={message.senderProfilePic} />
      <span
        className={`h-auto max-w-xs overflow-wrap break-words ${bg} text-xs rounded-lg p-3`}
      >
        {message?.text}
      </span>
    </div>
  );
};

export default Message;

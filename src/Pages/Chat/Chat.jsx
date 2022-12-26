import React from "react";
import SendMassage from "./SendMassage";

const Chat = () => {
  return (
    <div className="relative">
      <div className="px-20">
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://placeimg.com/192/192/people" alt="" />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
      </div>
      <div className="fixed bottom-1 w-full">
      <SendMassage></SendMassage>
      </div>
    </div>
  );
};

export default Chat;

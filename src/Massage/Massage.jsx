import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Pages/ContextProvider/AuthProvider';

const Massage = ({m}) => {
    const {text,sendTime,from,senderName,img,seenTime} = m
    const {user} = useContext(AuthContext)
    return (
        <div className={`chat ${user?.email === from ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="chat-header">
          {senderName}
          <time className="text-xs opacity-50">{sendTime}</time>
        </div>
        <div className={`chat-bubble text-slate-800 break-all shadow-md font-medium text-base  ${user?.email === from ? 'chat-bubble-accent' : 'chat-bubble-info'}`}>{text}</div>
        <div className="chat-footer opacity-50">{seenTime === '' ? '' :`Seen at ${seenTime}`}</div>
      </div>
    );
};

export default Massage;
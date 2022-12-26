import React from "react";

const SendMassage = () => {
  const send = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={send} className='py-3 px-10 bg-slate-100'>
      <input type="text" placeholder="Type a massage" className="input w-3/5 mx-auto break-all" />
    </form>
  );
};

export default SendMassage;

import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { AuthContext } from "../ContextProvider/AuthProvider";

const SendMassage = ({ setMassage, chat, massage,refetch }) => {
  const { user } = useContext(AuthContext);
  const { massages, _id} = chat;
  useEffect(() => {
    if (massages) {
      setMassage(massages);
    }
  },[massages]);
  const send = (e) => {
    e.preventDefault();
    if (massages) {
      const newMassageArray = [...massage];
      const massageObject = {
        from: user?.email,
        senderName:user?.displayName,
        img:user?.photoURL,
        text: e.target.text.value,
        sendTime: new Date().toLocaleString(),
        seenTime: "",
      };
      newMassageArray.push(massageObject);
      fetch(`http://localhost:5555/Chat/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newMassageArray),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            e.target.reset()
            refetch()
          }
        });
    }
  };

  return (
    <form onSubmit={send} className="py-3 px-10 bg-slate-100">
      <div className="input-group">
        <input
          name="text"
          type="text"
          placeholder="Search…"
          className="input input-bordered w-3/5 "
        />
        <button className="btn btn-square text-lg">
          <FaTelegramPlane></FaTelegramPlane>
        </button>
      </div>
    </form>
  );
};

export default SendMassage;

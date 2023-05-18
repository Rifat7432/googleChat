import React from "react";
import { useLoaderData } from "react-router-dom";
import Massage from "../../Massage/Massage";
import SendMassage from "./SendMassage";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthProvider";
import { useState } from "react";
import  {io}  from "socket.io-client";
import { useEffect } from "react";
import { FaTelegramPlane } from "react-icons/fa";


const Endpoint = "http://localhost:5000/";
const socket = io(Endpoint, { transports: ["websocket"] });

const Chat = () => {
  const { user } = useContext(AuthContext);
  const friend = useLoaderData();
  const [massage, setMassage] = useState([]);
  const {
    data: chat = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["chats", user?.email, friend?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5555/chats?user1=${friend?.email}&user2=${user?.email}`
        // {
        //   headers: {
        //     authorization: `bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );
      const data = await res.json();
      return data;
    },
  });
  const { massages, _id } = chat;
  useEffect(() => {
    if (chat?._id) {
      socket.emit("join-room", { roomId:chat?._id});
    }
    if(chat?.massages){
      setMassage(chat?.massages) 
      console.log('refetch')
    }
   
  }, [chat?._id,chat?.massages]);
  useEffect(() => {
    socket.on("get-massage", (data) => {
      setMassage(data?.a);
      console.log(data?.a)
    });
  }, [socket]);
  const send = (e) => {
    e.preventDefault();
    if (massages) {
      const newMassageArray = [...massage];
      const massageObject = {
        from: user?.email,
        senderName: user?.displayName,
        img: user?.photoURL,
        text: e.target.text.value,
        sendTime: new Date().toLocaleString(),
        seenTime: "",
      };
      newMassageArray.push(massageObject);

      fetch(`https://google-chat-rifat7432.vercel.app/Chat/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newMassageArray),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.acknowledged) {
            socket.emit("send-massage", {
              a: newMassageArray,
              roomId:_id,
            });
            refetch();
            e.target.reset();
          }
        });
    }
  };
  return (
    <div className="relative">
    
      <div className="px-20 pb-20">
        {massage.map((m, i) => (
          <Massage key={i} m={m}></Massage>
        ))}
      </div>
      <div className="fixed bottom-0 w-full">
        {/* <SendMassage
          setMassage={setMassage}
          refetch={refetch}
          chat={chat}
          massage={massage}
        ></SendMassage> */}
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
      </div>
    </div>
  );
};

export default Chat;

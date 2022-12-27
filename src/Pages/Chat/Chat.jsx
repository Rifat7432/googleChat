import React from "react";
import { useLoaderData } from "react-router-dom";
import Massage from "../../Massage/Massage";
import SendMassage from "./SendMassage";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthProvider";
import { useState } from "react";

const Chat = () => {
  const {user} = useContext(AuthContext)
  const friend = useLoaderData()
  const [massage,setMassage] = useState([])
  const {
    data: chat = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["chats", user?.email,friend?.email],
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
  console.log(massage)
  return (
    <div className="relative">
      <div className="px-20">
     {massage.map(( m,i ) =><Massage key={i} m={m}></Massage>)}
      </div>
      <div className="fixed bottom-1 w-full">
      <SendMassage setMassage={setMassage} refetch={refetch} chat={chat} massage={massage}></SendMassage>
      </div>
    </div>
  );
};

export default Chat;

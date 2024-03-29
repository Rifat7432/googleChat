import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Chat from "../Chat/Chat";
import { AuthContext } from "../ContextProvider/AuthProvider";
import Massager from "../Massager/Massager";
import { useQuery } from "@tanstack/react-query";
import { FaPlusCircle } from "react-icons/fa";

const Massagers = () => {
  const { user } = useContext(AuthContext);
  const {
    data: massagers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["friends", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://google-chat-rifat7432.vercel.app/friends/${user?.email}`
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
  console.log(massagers)
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-200 py-10">
          <Outlet></Outlet>
          {/* <Chat></Chat> */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu w-96 bg-base-50 text-base-content">
            <li>
              <div className="flex items-center bg-slate-100   ">
                <img
                  className="mask mask-circle h-12 my-1 w-12"
                  src={user?.photoURL}
                  alt=""
                />
                <div className=" w-full py-1 ">
                  <Link to={"/friend"} className="btn btn-circle ml-20 btn-outline"><FaPlusCircle></FaPlusCircle> </Link>
                </div>
              </div>
            </li>
            {massagers.map((m) => (
              <Massager key={m._id} m={m}></Massager>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Massagers;

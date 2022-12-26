import React from "react";
import { Link } from "react-router-dom";

const Massager = ({ m }) => {
  const { img, name } = m;
  return (
    <Link>
    <div className="flex items-center hover:bg-slate-100 pl-4 mr-2 ">
      <img className="mask mask-circle h-14 my-3 w-14" src={img} alt="" />
      <div className="border-b-2 w-full py-3 ml-5">
        <h2 className="text-xl font-semibold">{name}</h2>
        <h2 className=" text-base font-normal">{name}</h2>
      </div>
    </div>
    </Link>
  );
};

export default Massager;

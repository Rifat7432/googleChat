import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Chat from '../Chat/Chat';
import Massager from '../Massager/Massager';

const Massagers = () => {
    const [massager,setMassager] = useState([])
    const fackData = [
        {
            img:'https://placeimg.com/192/192/people',
            email:'md1@gmail.com',
            name:'md1'
        },
        {
            img:'https://placeimg.com/192/192/people',
            email:'md2@gmail.com',
            name:'md2'
        },
        {
            img:'https://placeimg.com/192/192/people',
            email:'md3@gmail.com',
            name:'md3'
        },
        {
            img:'https://placeimg.com/192/192/people',
            email:'md4@gmail.com',
            name:'md4'
        },
        {
            img:'https://placeimg.com/192/192/people',
            email:'md5@gmail.com',
            name:'md5'
        }
    ]
   
    return (
        <div>
            <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content bg-slate-200 py-10">
 {/* <Outlet></Outlet> */}
 <Chat></Chat>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu w-96 bg-base-50 text-base-content">
  
    {
                fackData.map((m,i) => <Massager key={i} m={m}></Massager> )
            }
    </ul>
  
  </div>
</div>
            
        </div>
    );
};

export default Massagers;
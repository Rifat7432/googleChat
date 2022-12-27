import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../ContextProvider/AuthProvider';
import Login from '../Login/Login';
import Massagers from '../Massagers/Massagers';

const Home = () => {
    const {user} = useContext(AuthContext) 
    return (
        <div>
            {
                user ? <Massagers></Massagers> : <Login></Login>
            }
        </div>
    );
};

export default Home;
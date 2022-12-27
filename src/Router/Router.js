import { createBrowserRouter } from "react-router-dom";
import Chat from "../Pages/Chat/Chat";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Massagers from "../Pages/Massagers/Massagers";
import SignUp from "../Pages/Signup/SignUp";

const router = createBrowserRouter([{
    path:'/',
    element:<Home></Home>
},
{
    path:'/login',
    element:<Login></Login>
},
{
    path:'/signup',
    element:<SignUp></SignUp>
},
{
    path:'/chat',
    element:<Massagers></Massagers>,
    children:[
        {
            path:'/chat',
            element:<Chat></Chat>
        },
        {
            path:'/chat/:id',
            element:<Chat></Chat>,
            loader:({params})=>fetch(`http://localhost:5555/friend/${params?.id}`)
        }
    ]
},

]);
export default router;

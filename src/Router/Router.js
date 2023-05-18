import { createBrowserRouter } from "react-router-dom";
import Chat from "../Pages/Chat/Chat";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Massagers from "../Pages/Massagers/Massagers";
import SignUp from "../Pages/Signup/SignUp";
import AddFriend from "../Pages/Massagers/AddFriend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/friend",
    element: <AddFriend></AddFriend>,
  },
  {
    path: "/chat",
    element: <Massagers></Massagers>,
    children: [
      {
        path: "/chat",
        element: <Chat></Chat>,
      },
      {
        path: "/chat/:id",
        element: <Chat></Chat>,
        loader: ({ params }) =>
          fetch(
            `https://google-chat-rifat7432.vercel.app/friend/${params?.id}`
          ),
      },
    ],
  },
]);
export default router;

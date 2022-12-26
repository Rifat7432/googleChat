import { createBrowserRouter } from "react-router-dom";
import Massagers from "../Pages/Massagers/Massagers";

const router = createBrowserRouter([{
    path:'/',
    element:<Massagers></Massagers>
}]);
export default router;

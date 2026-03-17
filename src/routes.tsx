import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/Login";
import Home from "./pages/home/Home";
import Archived from "./pages/archived/Archived";
import Account from "./pages/account/Account";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/archived",
        element: <Archived />
    },
    {
        path: "/account",
        element: <Account />
    }
])

export { router };
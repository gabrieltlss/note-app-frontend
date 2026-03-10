import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/Login";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />
    }
])

export { router };
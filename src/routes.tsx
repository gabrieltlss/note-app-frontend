import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/Login";
import Home from "./pages/home/Home";
import OAuthSuccess from "./pages/oauth-success/OauthSuccess";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/oauth-success",
        element: <OAuthSuccess />
    },
    {
        path: "/home",
        element: <Home />
    }
])

export { router };
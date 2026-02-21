import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function OAuthSuccess() {
    const navigate = useNavigate()
    const { addToken } = useContext(AppContext);

    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        const getToken = url.get("token");
        addToken(getToken);
        navigate("/home");
    }, []);

    return <p>Autenticando...</p>
}
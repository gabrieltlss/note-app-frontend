import { Link, useNavigate } from "react-router-dom";
import style from "./header.module.css";
import { useState } from "react";
import { logout } from "../../services/logout";

type AlertType = { color: "w3-pale-green" | "w3-pale-red", message: string };

export default function Header() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<AlertType | null>(null);

    const handleLogout = async () => {
        const logoutUser = await logout();

        if (typeof logoutUser === "string" &&
            (logoutUser === "InvalidToken" || logoutUser === "Authentication failed")) {
            navigate("/");
            return;
        }

        if (typeof logoutUser === "string" && logoutUser === "UserNotDefined" || logoutUser === "InvalidUser") {
            setAlert({ color: "w3-pale-red", message: "Sessão inválida. Entre novamente." });
            return;
        }

        if (typeof logoutUser === "string" && logoutUser === "ServerError") {
            setAlert({ color: "w3-pale-red", message: "Error ao sair." });
            return;
        }

        if (typeof logoutUser === "string" && logoutUser === "Success") {
            navigate("/");
            return;
        }
    };

    return (
        <>
            <header className={`${style.header} w3-asphalt`}>
                <h1>Notas</h1>

                <nav>
                    <ul className={style["header-nav"]}>
                        <li>
                            <Link to={"/home"} className={style["nav-link"]}>Início</Link>
                        </li>
                        <li>
                            <Link to={"/archived"} className={style["nav-link"]}>Arquivadas</Link>
                        </li>
                        <li>
                            <Link to={"/account"} className={style["nav-link"]}>Conta</Link>
                        </li>
                        <li>
                            {/* <Link to={"/logout"} className={style["nav-link"]}>Sair</Link> */}
                            <a className={style["nav-link"]} onClick={handleLogout} style={{ cursor: "pointer" }}>Sair</a>
                        </li>
                    </ul>
                </nav>
            </header>

            {
                alert !== null
                    ?
                    <div className={`w3-center w3-bottom`}>
                        <div className={`${style.alert} ${alert.color} w3-border w3-round-large`}>{alert.message}</div>
                    </div>
                    :
                    null
            }
        </>
    );
}
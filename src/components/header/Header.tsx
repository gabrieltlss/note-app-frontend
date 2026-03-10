import { Link } from "react-router-dom";
import style from "./header.module.css";

export default function Header() {
    return (
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
                        <Link to={"/logout"} className={style["nav-link"]}>Sair</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
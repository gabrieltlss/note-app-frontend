import { Link } from "react-router-dom";

export function Sidebar() {
    return (
        <nav className="w3-sidebar w3-bar-block w3-border-right w3-animate-left w3-hide">
            <button className="w3-bar-item w3-button w3-bold">Fechar &times;</button>
            <Link to="/home" className="w3-button w3-bar-item">Home</Link>
            <Link to="/archived" className="w3-button w3-bar-item">Arquivadas</Link>
            <Link to="/account" className="w3-button w3-bar-item">Conta</Link>
            <Link to="/archived" className="w3-button w3-bar-item">Sair</Link>
        </nav>
    );
}
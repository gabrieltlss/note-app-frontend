import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <header className="w3-container w3-asphalt">
                <h1>Notas</h1>
            </header>

            <section className="w3-padding-large w3-center">
                <h2>Rota não encontrada...</h2>
                <p>
                    Retorne para a página <Link to="/home"><b>Principal</b></Link> ou para a página de <Link to="/"><b>Login</b></Link>.
                </p>
            </section>
        </>
    );
}   
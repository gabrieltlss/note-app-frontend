import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <header className="w3-container w3-asphalt">
                <h1>Notas</h1>
            </header>

            <section className="w3-padding-large w3-center">
                <h2>Um erro inesperado ocorreu...</h2>
                <p>
                    Tente novamente mais tarde ou retorne para a página <Link to="/home"><b>Principal</b></Link> ou para a página de <Link to="/"><b>Login</b></Link>.
                </p>
            </section>
        </>
    );
}   
import type { ReactNode } from "react";
import "./login.css";

export function Login(): ReactNode {
    return (
        <>
            <header className="w3-container w3-asphalt w3-center">
                <h1>Notas</h1>
            </header>

            <div className="w3-flex" id="login">
                <div className="login-content-container w3-center w3-white w3-card w3-round-xlarge">
                    <img src="/images/login-hero-img.webp" alt="" className="hero-img w3-round-large" />

                    <h2>Entrar</h2>
                    <p>Realize login com uma conta Google</p>
                    <a href={`${import.meta.env.VITE_API_URL}/google`} className="w3-button w3-asphalt w3-round-large login-btn">
                        <img src="/images/google-icon.png" alt="" className="btn-logo" width={24} height={24} />
                        <span>Entrar</span>
                    </a>
                </div>
            </div>
        </>
    );
}
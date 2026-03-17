import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import style from "./account.module.css";
import { fetchUser } from "../../services/fetchUser";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/deleteUser";

type Feedback = { type: "success" | "error", message: string };

export default function Account() {
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const [feedback, setFeedback] = useState<Feedback>();
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [user, setUser] = useState<{ id: number, email: string }>();
    const [isUserDeleted, setIsUserDeleted] = useState<boolean>(false);

    useEffect(() => {
        async function setInitialUserState() {
            setIsLoading(true);
            try {
                const getUser = await fetchUser();
                if (typeof getUser === "string" &&
                    (getUser === "InvalidToken" || getUser === "Authentication failed")) {
                    navigate("/");
                    return;
                }

                if (typeof getUser === "string" && getUser === "UserNotFound") {
                    setError("Usuário não encontrado.");
                    return;
                }

                if (typeof getUser === "string" && getUser === "UserNotDefined" || getUser === "InvalidUser") {
                    setError("Sessão inválida. Entre novamente.")
                    return;
                }

                if (typeof getUser === "string" && getUser === "ServerError") {
                    setError("Erro ao obter informações do usuário");
                    return;
                }

                setUser(getUser);
            } finally {
                setIsLoading(false);
            }
        }
        setInitialUserState();
    }, [])

    const handleUserDelete = async () => {
        if (!user || typeof user === "undefined") return;

        const confirmDelete = confirm("Tem certeza que deseja excluir sua conta?\nEsta ação é irreversível.")
        if (!confirmDelete) return;

        setIsSubmiting(true);
        try {
            const deleteRes = await deleteUser();
            if (typeof deleteRes === "string" &&
                (deleteRes === "InvalidToken" || deleteRes === "Authentication failed")) {
                navigate("/");
                return;
            }

            if (typeof deleteRes === "string" && deleteRes === "UserNotDefined" || deleteRes === "InvalidUser") {
                setError("Sessão inválida. Entre novamente.");
                return;
            }

            if (typeof deleteRes === "string" && deleteRes === "ServerError") {
                setFeedback({ type: "error", message: "Erro ao excluir usuário." });
                return;
            }

            if (deleteRes === "UserDeleted") {
                setFeedback({ type: "success", message: "Usuário excluído. Redirecionando..." });
                setUser(undefined);
                setIsUserDeleted(true)
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        } finally {
            setIsSubmiting(false);
        }
    };

    if (isLoading) {
        return (
            <>
                <Header></Header>
                <section className={style["container"]}>
                    <p className="w3-center w3-large">A carregar...</p>
                </section>
            </>
        );
    }
    if (error) {
        return (
            <>
                <Header></Header>
                <section className={style["container"]}>
                    <p className="w3-center w3-large">{error}</p>
                </section>
            </>
        );
    }

    return (
        <>
            <Header />

            <section className={style["container"]}>
                {
                    typeof user !== "undefined"
                        ?
                        <div className="w3-center">
                            <h2>Informações do usuário</h2>
                            <p className="w3-medium"><b>Email:</b> {user.email}</p>

                            <button
                                className="w3-button w3-asphalt w3-round-large"
                                type="button"
                                onClick={handleUserDelete}
                                disabled={isSubmiting}
                            >
                                Deletar contar
                            </button>

                            <div className="w3-section">
                                {
                                    feedback?.type === "error" ?
                                        <span className="w3-small w3-text-red">{feedback.message}</span>
                                        : null
                                }
                                {
                                    feedback?.type === "success" ?
                                        <span className="w3-small w3-text-green">{feedback.message}</span>
                                        : null
                                }
                            </div>
                        </div>
                        :
                        isUserDeleted === true
                            ?
                            <p className="w3-center w3-large w3-text-green">Usuário excluído. Redirecionando...</p>
                            :
                            <p className="w3-center w3-large">Erro ao obter informações de usuário.</p>
                }
            </section >
        </>
    )
}
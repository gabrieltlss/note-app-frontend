import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./modalForm.module.css";
import { createNote } from "../../services/createNote";
import { fetchNotes } from "../../services/fetchNotes";
import { ApiError, TokenError } from "../../services/api";
import { AppContext } from "../../context/AppContext";

type Feedback = { type: "success" | "error"; message: string } | null;

export default function ModalForm() {
    const navigate = useNavigate();
    const { setNotes } = useContext(AppContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const closeModal = () => {
        const modal = document.getElementById("modal");
        if (modal) modal.style.display = "none";
    };

    const resetForm = () => {
        setContent("");
        setTitle("");
    };

    const showFeedback = (fb: Feedback, delayMs: number) => {
        setFeedback(fb);
        setTimeout(() => setFeedback(null), delayMs);
    };

    const handleSubmit = async (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        setFeedback(null);

        if (title === "" || content === "") {
            alert("Preencha os campos de título e conteúdo");
            return;
        }

        if (title.length > 90 || content.length > 500) {
            alert("Respeite os limites de caractéres\nTítulo: 90 carácteres\nConteúdo: 500 carácteres.");
            return;
        }

        setIsSubmitting(true);
        try {
            await createNote(title, content);
            const updatedNotes = await fetchNotes();
            setNotes(updatedNotes);
            showFeedback({ type: "success", message: "Nota criada com successo" }, 2500);
            resetForm();
        } catch (err) {
            if (err instanceof TokenError) {
                navigate("/");
                return;
            }
            if (err instanceof ApiError) {
                const errorMessages: Record<string, string> = {
                    UserNotDefined: "Sessão inválida. Reinicie a sessão.",
                    InvalidUser: "Utilizador inválido. Reinicie a sessão.",
                    InvalidFields: "Campos inválidos. Verifique o título e conteúdo.",
                    ServerError: "Erro de servidor. Tente novamente.",
                };
                showFeedback({ type: "error", message: errorMessages[err.errorCode] ?? "Erro desconhecido. Tente novamente." }, 5000);
                return;
            }
            showFeedback({ type: "error", message: "Erro inesperado. Tente novamente." }, 2500);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className={`${style.modal} w3-modal`} id="modal">
                <div className="w3-modal-content w3-white">
                    <header className="w3-container w3-asphalt w3-center">
                        <h1>Criar nota</h1>
                    </header>

                    <div className="w3-container">
                        <form onSubmit={handleSubmit}>
                            <div className="w3-section">
                                <label htmlFor="title">Título: </label>
                                <input
                                    type="text" name="title"
                                    id="title" className="w3-input"
                                    value={title}
                                    onChange={(ev) => setTitle(ev.currentTarget.value)}
                                />
                            </div>

                            <div className="w3-section">
                                <label htmlFor="content">Conteúdo</label>
                                <br />
                                <textarea
                                    name="content" id="content"
                                    className={`${style.content} w3-margin-top`}
                                    placeholder="Digite até 500 carácteres."
                                    value={content}
                                    onChange={(ev) => setContent(ev.currentTarget.value)}
                                ></textarea>
                            </div>

                            <div className={`${style["form-buttons"]} w3-section`}>
                                <div>
                                    <button
                                        type="submit"
                                        className="w3-button w3-round w3-asphalt"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "A criar..." : "Criar"}
                                    </button>
                                    {feedback?.type === "success" && (
                                        <span className="w3-margin-left w3-small w3-text-green">
                                            {feedback.message}
                                        </span>
                                    )}
                                    {feedback?.type === "error" && (
                                        <span className="w3-margin-left w3-small w3-text-red">
                                            {feedback.message}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <button type="button" className="w3-button w3-round w3-info" onClick={resetForm}>Resetar</button>
                                    <button type="button" className="w3-button w3-round w3-red w3-margin-left" onClick={closeModal}>Fechar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
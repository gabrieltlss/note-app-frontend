import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./modalForm.module.css";
import { AppContext } from "../../context/AppContext";
import { createNote } from "../../services/createNote";
import { fetchNotes } from "../../services/fetchNotes";

type Feedback = { type: "success" | "error", message: string }

export default function ModalForm() {
    const navigate = useNavigate();
    const { filterActivedNotes, filterArchivedNotes } = useContext(AppContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [feedback, setFeedback] = useState<Feedback | null>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const closeModal = () => {
        const modal = document.getElementById("modal");
        if (modal) modal.style.display = "none";
    };

    const resetForm = () => {
        setContent("");
        setTitle("");
    };

    const resetFeedback = () => {
        setTimeout(() => setFeedback(null), 3000)
    }

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
            const create = await createNote(title, content);
            if (typeof create === "string" &&
                (create === "InvalidToken" || create === "UserNotDefined" || create === "InvalidUser")) {
                navigate("/");
                return;
            }

            if (create === "InvalidFields" || create === "ServerError") {
                setFeedback({ type: "error", message: "Erro ao criar nota" });
                resetFeedback();
                return;
            }

            if (create === "NoteCreated") {
                setFeedback({ type: "success", message: "Nota criada com successo" });
                resetFeedback();

                const getNotes = await fetchNotes();
                if (typeof getNotes === "string" &&
                    (getNotes === "InvalidToken" || getNotes === "UserNotDefined" || getNotes === "InvalidUser")) {
                    navigate("/");
                    return;
                }
                if (typeof getNotes === "string" && getNotes === "ServerError") {
                    setFeedback({ type: "error", message: "Erro ao obter notas atualizadas." });
                    resetFeedback();
                    return;
                }
                filterActivedNotes(getNotes);
                filterArchivedNotes(getNotes);
            }
        } finally {
            setIsSubmitting(false);
            resetForm();
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
                                    {
                                        feedback?.type === "success" &&
                                        <span className="w3-margin-left w3-small w3-text-green">
                                            {feedback.message}
                                        </span>
                                    }
                                    {
                                        feedback?.type === "error" &&
                                        <span className="w3-margin-left w3-small w3-text-red">
                                            {feedback.message}
                                        </span>
                                    }
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
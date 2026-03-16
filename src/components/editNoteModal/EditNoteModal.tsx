import { useContext, useState } from "react";
import style from "./edit-note.module.css";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { updateNote } from "../../services/updateNote";
import { fetchNotes } from "../../services/fetchNotes";

type Feedback = { type: "success" | "error"; message: string } | null;

export default function EditNoteModal(
    { currentTitle, currentContent, currentStatus, noteId, toggleModal }:
        {
            currentTitle: string,
            currentContent: string,
            currentStatus: string
            noteId: number
            toggleModal: React.Dispatch<React.SetStateAction<boolean>>,
        }
) {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>(currentTitle);
    const [content, setContent] = useState<string>(currentContent);
    const [status, setStatus] = useState<string>(currentStatus);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<Feedback>(null);
    const { setNotes } = useContext(AppContext);


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

        if (title === currentTitle && content === currentContent && status === currentStatus) return;


        setIsSubmitting(true);
        try {
            const update = await updateNote(title, content, status ? status : "active", noteId);

            if (update === "NoteUpdated") {
                setFeedback({ type: "success", message: "Nota atualizada" });

                const getNotes = await fetchNotes();
                if (typeof getNotes === "string" &&
                    (getNotes === "InvalidToken" || getNotes === "UserNotDefined" || getNotes === "InvalidUser")) {
                    navigate("/");
                    return;
                }

                if (typeof getNotes === "string" && getNotes === "ServerError") {
                    setFeedback({ type: "error", message: "Erro ao recarregar notas." });
                    return;
                }

                setNotes(getNotes);
                return;
            }

            if (typeof update === "string" &&
                (update === "InvalidToken" || update === "UserNotDefined" || update === "InvalidUser")) {
                navigate("/");
                return;
            }

            if (update === "InvalidFields") {
                setFeedback({ type: "error", message: "Campos inválidos" });
                return;
            }

            if (update === "ServerError" || update === "NoteNotUpdated") {
                setFeedback({ type: "error", message: "Erro ao atualizar nota" });
                return;
            }
        }
        finally {
            setTimeout(() => setFeedback(null), 2500);
            setIsSubmitting(false);
        }
    }

    return (
        <>
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

                <div className="w3-section">
                    <label htmlFor="status">Status:</label>
                    <select
                        name="status" id="status"
                        className={`${style.select} w3-input`}
                        onChange={(ev) => setStatus(ev.currentTarget.value)}
                        defaultValue={currentStatus}
                    >
                        <option value="active">Ativo</option>
                        <option value="archived">Arquivado</option>
                    </select>
                </div>

                <div className={`${style["btn-container"]} w3-section`}>
                    <div>
                        <button type="submit" className="w3-button w3-round w3-asphalt"
                            disabled={isSubmitting}>{isSubmitting ? "A salvar..." : "Salvar"}</button>

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
                        <button type="button" className="w3-button w3-round w3-red w3-margin-left" onClick={() => toggleModal(false)}>Fechar</button>
                    </div>
                </div>
            </form>
        </>
    )
}
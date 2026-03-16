import { useContext, useState } from "react";
import type { Note } from "../../types/Notes";
import { formatDate } from "../../utils/indexUtils";
import style from "./note.module.css";
import EditNoteModal from "../editNoteModal/EditNoteModal";
import { deleteNoteById } from "../../services/deleteNote";
import { useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";
import { fetchNotes } from "../../services/fetchNotes";
import { AppContext } from "../../context/AppContext";


type ShowAlert = {
    color: "pale-green" | "pale-red",
    text: string
} | null;

export default function Note({ item }: { item: Note }) {
    const navigate = useNavigate();
    const { setNotes } = useContext(AppContext)
    const [isVisualizeModalOpen, setIsVisualizeModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [alert, setAlert] = useState<ShowAlert>(null);

    const handleDelete = async () => {
        const confirm = window.confirm(`Quer excluir a nota "${item.title}"?`);
        if (!confirm) return;

        try {
            const deleteNote = await deleteNoteById(String(item.note_id));

            if (typeof deleteNote === "string" && deleteNote === "NoteDeleted") {
                const getNotes = await fetchNotes();
                if (typeof getNotes === "string" &&
                    (getNotes === "InvalidToken" || getNotes === "UserNotDefined" || getNotes === "InvalidUser")) {
                    navigate("/");
                    return;
                }
                if (typeof getNotes === "string" && getNotes === "ServerError") {
                    setAlert({ color: "pale-red", text: "Erro ao atualizar notas." });
                    return;
                }
                setNotes(getNotes);
                return;
            }

            if (typeof deleteNote === "string" && deleteNote === "NoteNotFound") {
                setAlert({ color: "pale-red", text: "Nota não encontrada" });
                return;
            }

            if (typeof deleteNote === "string" &&
                (deleteNote === "InvalidToken" || deleteNote === "UserNotDefined" || deleteNote === "InvalidUser")) {
                navigate("/");
                return;
            }

            if (typeof deleteNote === "string" && deleteNote === "ServerError") {
                setAlert({ color: "pale-red", text: "Erro ao excluir nota. Tente novamente." });
                return;
            }

        } finally {
            setTimeout(() => setAlert(null), 2500);
        }
    };

    return (
        <>
            {isVisualizeModalOpen && (
                <div className={`${style.modal} w3-modal`} style={{ display: "block" }}>
                    <div className={`${style["modal-content"]} w3-white`}>
                        <header className="w3-container w3-center w3-asphalt">
                            <h2>{item.title}</h2>
                        </header>

                        <div className="w3-container">
                            <div className={`${style["modal-note-content"]} w3-section w3-padding w3-border w3-round-large`}>
                                <p>{item.content}</p>
                            </div>

                            <div className="w3-section">
                                <p className="w3-small">Status: <span className={`w3-tag ${item.status === "active" ? "w3-green" : "w3-blue"}`}>
                                    {
                                        item.status === "active"
                                            ?
                                            "Ativo"
                                            :
                                            item.status === "archived"
                                                ?
                                                "Arquivado"
                                                :
                                                null
                                    }
                                </span>
                                </p>
                                <p className="w3-small">Criado em: {formatDate(String(item.created_at))}</p>
                                <p className="w3-small">Atualizado em: {formatDate(String(item.updated_at))}</p>
                            </div>
                            <div className="w3-section w3-center">
                                <button className="w3-button w3-round w3-red" onClick={() => setIsVisualizeModalOpen(false)}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className={`w3-modal`} style={{ display: "block" }}>
                    <div className="w3-white w3-modal-content">
                        <header className="w3-container w3-center w3-asphalt">
                            <h2>Atualizar nota</h2>
                        </header>

                        <div className="w3-container">
                            <EditNoteModal
                                noteId={item.note_id}
                                currentTitle={item.title}
                                currentContent={item.content}
                                currentStatus={item.status}
                                toggleModal={setIsEditModalOpen}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Nota que será mostrada para usuários. */}
            <div className={`${style.note} w3-card w3-round-large`}>
                <header className="w3-container w3-center">
                    <h4>{item.title}</h4>
                </header>

                <div className={`${style["note-content"]} w3-container`}>
                    <p>{item.content}</p>
                </div>

                <div className={`${style["btn-container"]} w3-container w3-section`}>
                    <div className="w3-dropdown-click w3-circle">
                        <button
                            className={`${style["note-btn"]} w3-circle w3-white w3-hover-asphalt w3-border`}
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        >
                            <span className="material-symbols-outlined w3-large">more_vert</span>
                        </button>

                        {isDropdownOpen && (
                            <div className={`${style.dropdown} w3-dropdown-content w3-bar-block w3-border w3-block`}>
                                <div
                                    className="w3-bar-item w3-button w3-hover-asphalt"
                                    onClick={() => { setIsVisualizeModalOpen(true); setIsDropdownOpen(false); }}
                                >
                                    Visualizar
                                </div>

                                <div className="w3-bar-item w3-button w3-hover-asphalt"
                                    onClick={() => { setIsEditModalOpen(true); setIsDropdownOpen(false); }}
                                >
                                    Editar
                                </div>
                                <div className="w3-bar-item w3-button w3-hover-asphalt"
                                    onClick={() => handleDelete()}
                                >
                                    Excluir
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {
                alert === null
                    ?
                    null
                    :
                    <Alert color={alert.color} message={alert.text} />
            }
        </>
    );
}
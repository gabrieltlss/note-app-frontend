import { useState } from "react";
import type { Note } from "../../types/Notes";
import { captalizeStatus, formatDate } from "../../utils/indexUtils";
import style from "./note.module.css";

export default function Note({ item }: { item: Note }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>
            {isModalOpen && (
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
                                    {captalizeStatus(item.status)}
                                </span>
                                </p>
                                <p className="w3-small">Criado em: {formatDate(String(item.created_at))}</p>
                                <p className="w3-small">Atualizado em: {formatDate(String(item.updated_at))}</p>
                            </div>
                            <div className="w3-section w3-center">
                                <button className="w3-button w3-round w3-red" onClick={() => setIsModalOpen(false)}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Nota que será mostrada para usuários. */}
            <div className={`${style.note} w3-card w3-round-large`}>
                <header className="w3-container w3-center">
                    <h3>{item.title}</h3>
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
                            <span className="material-symbols-outlined w3-large">double_arrow</span>
                        </button>

                        {isDropdownOpen && (
                            <div className={`${style.dropdown} w3-dropdown-content w3-bar-block w3-border w3-block`}>
                                <div
                                    className="w3-bar-item w3-button w3-hover-asphalt"
                                    onClick={() => { setIsModalOpen(true); setIsDropdownOpen(false); }}
                                >
                                    Visualizar
                                </div>
                                <div className="w3-bar-item w3-button w3-hover-asphalt">Editar</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
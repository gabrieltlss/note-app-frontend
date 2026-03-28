import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Header from "../../components/header/Header";
import { useContext, useEffect, useState } from "react";
import style from "./home.module.css";
import { fetchNotes } from "../../services/fetchNotes";
import NewNotesBtn from "../../components/newNotesBtn/NewNotesBtn";
import ModalForm from "../../components/createNoteForm/ModalForm";
import Note from "../../components/note/Note";

export default function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const { notes, filterActivedNotes } = useContext(AppContext);

    useEffect(() => {
        async function setInitialState() {
            setLoading(true);
            try {
                const getNotes = await fetchNotes();
                if (typeof getNotes === "string" &&
                    (getNotes === "InvalidToken" || getNotes === "UserNotDefined" ||
                        getNotes === "InvalidUser" || getNotes === "Authentication failed")) {
                    navigate("/");
                    return;
                }

                if (typeof getNotes === "string" && getNotes === "UserNotFound") {
                    setError("Usuário não encontrado.");
                    return;
                }

                if (typeof getNotes === "string" && getNotes === "ServerError") {
                    setError("Erro ao obter notas.");
                    return;
                }

                filterActivedNotes(getNotes);
            } finally {
                setLoading(false);
            }
        }

        setInitialState();
    }, []);

    if (loading) {
        return (
            <>
                <Header></Header>
                <section className={style["note-container"]} id="notes">
                    <p className="w3-center w3-large">A carregar...</p>
                </section>
            </>
        );
    }
    if (error) {
        return (
            <>
                <Header></Header>
                <section className={style["note-container"]} id="notes">
                    <p className="w3-center w3-large">{error}</p>
                </section>
            </>
        );
    }

    return (
        <>
            <Header></Header>

            <section className={style["note-container"]} id="notes">
                {
                    notes.length > 0
                        ?
                        notes.map((note) => (
                            <Note key={note.note_id} item={note} />
                        ))
                        :
                        <p className="w3-center w3-large">
                            Não há notas ativas.
                        </p>
                }

                <ModalForm />
                <NewNotesBtn />
            </section>
        </>
    );
}
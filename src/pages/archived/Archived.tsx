import { useContext, useState, useEffect } from "react";
import Header from "../../components/header/Header"
import style from "./archived.module.css";
import { AppContext } from "../../context/AppContext";
import Note from "../../components/note/Note";
import { fetchNotes } from "../../services/fetchNotes";
import { useNavigate } from "react-router-dom";

export default function Archived() {
    const navigate = useNavigate();
    const { archivedNotes, filterArchivedNotes } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);


    useEffect(() => {
        async function setInitialState() {
            try {
                const getNotes = await fetchNotes();
                if (typeof getNotes === "string" &&
                    (getNotes === "InvalidToken" || getNotes === "UserNotDefined" || getNotes === "InvalidUser"
                        || getNotes === "Authentication failed")) {
                    navigate("/");
                    return;
                }

                if (typeof getNotes === "string" && getNotes === "ServerError") {
                    setError("Erro ao obter notas.");
                    return;
                }
                filterArchivedNotes(getNotes);
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
            <Header />

            <section className={style["note-container"]} id="notes">
                {
                    archivedNotes.length > 0
                        ?
                        archivedNotes.map(note => (
                            <Note key={note.note_id} item={note} />
                        ))
                        :
                        <p className="w3-large w3-center">Não há notas arquivadas</p>
                }
            </section >
        </>
    )
}
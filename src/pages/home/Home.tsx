import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Header from "../../components/header/Header";
import { useContext, useEffect, useState } from "react";
import style from "./home.module.css";
import { fetchNotes } from "../../services/fetchNotes";
import NewNotesBtn from "../../components/newNotesBtn/NewNotesBtn";
import ModalForm from "../../components/modal/ModalForm";
import Note from "../../components/note/Note";
import { TokenError } from "../../services/api";

export default function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const { notes, setNotes } = useContext(AppContext);

    useEffect(() => {
        async function setInitialState() {
            try {
                const result = await fetchNotes();
                setNotes(result);
            } catch (err) {
                if (err instanceof TokenError) {
                    navigate("/");
                    return;
                }
                setError("Erro ao carregar notas. Tente novamente.");
            } finally {
                setLoading(false);
            }
        }

        setInitialState();
    }, [navigate]);

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
                            Não há notas criadas.
                        </p>
                }

                <ModalForm />
                <NewNotesBtn />
            </section>
        </>
    );
}
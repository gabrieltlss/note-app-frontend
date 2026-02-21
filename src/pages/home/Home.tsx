import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function Home() {
    const [notes, setNotes] = useState(null);
    const { token } = useContext(AppContext);

    const handleNotes = async () => {
        const getNotes = await fetch("http://localhost:3000/notes", { credentials: "include" });
        const res = await getNotes.json();
        console.log(res);
        setNotes(() => res);
    };

    return (
        <>
            <h1>{token}</h1>
            <button onClick={handleNotes}>Notas</button>
        </>
    );
}
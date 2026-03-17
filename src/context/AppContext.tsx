import { createContext, useState } from "react";
import type { IAppContext } from "../types/IAppContext";
import type { Note } from "../types/Notes";

const AppContext = createContext({} as IAppContext);

function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);

    const filterArchivedNotes = (archived: Note[]) => {
        const filterArchived = archived.filter(note => note.status === "archived");
        setArchivedNotes(filterArchived)
    };

    const filterActivedNotes = (archived: Note[]) => {
        const filterArchived = archived.filter(note => note.status === "active");
        setNotes(filterArchived)
    };

    const addNote = (note: Note): void => {
        setNotes((state) => {
            const newState = [...state, note];
            return newState;
        });
    };

    const removeNote = (noteId: number): void => {
        setNotes((state) => {
            const filteredList = state.filter(item => item.note_id !== noteId);
            return filteredList;
        });
    }

    return (
        <AppContext.Provider value={{
            notes,
            archivedNotes,
            filterArchivedNotes,
            filterActivedNotes,
            addNote,
            removeNote
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
import { createContext, useState } from "react";
import type { IAppContext } from "../types/IAppContext";
import type { Note } from "../types/Notes";

const AppContext = createContext({} as IAppContext);

function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);

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
            setNotes,
            addNote,
            removeNote
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
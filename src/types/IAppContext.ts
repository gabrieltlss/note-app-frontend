// import type { Dispatch, SetStateAction } from "react";
import type { Note } from "./Notes"

export type IAppContext = {
    notes: Note[];
    // setNotes: Dispatch<SetStateAction<Note[]>>;
    archivedNotes: Note[];
    // setArchivedNotes: Dispatch<SetStateAction<Note[]>>;
    filterActivedNotes: (archived: Note[]) => void;
    filterArchivedNotes: (archived: Note[]) => void;
    addNote: (notes: Note) => void;
    removeNote: (noteId: number) => void;
}
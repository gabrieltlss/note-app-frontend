import type { Dispatch, SetStateAction } from "react";
import type { Note } from "./Notes"

export type IAppContext = {
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
    addNote: (notes: Note) => void;
    removeNote: (noteId: number) => void;
}
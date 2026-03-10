import type { Note } from "../types/Notes";
import { api, ApiError, TokenError } from "./api";

async function fetchNotes(retry = true): Promise<Note[]> {
    const res = await api.get("/notes");
    const body = await res.json();

    if (body.message === "TokenCreated") {
        if (retry) return fetchNotes(false);
        throw new TokenError();
    }

    if (body.error === "InvalidToken") throw new TokenError();
    if (body.error) throw new ApiError(res.status, body.error);

    return body as Note[];
}

export { fetchNotes };

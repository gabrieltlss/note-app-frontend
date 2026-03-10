import { api, ApiError, TokenError } from "./api";

async function createNote(title: string, content: string, retry = true): Promise<void> {
    const res = await api.post("/notes", { title, content });
    const body = await res.json();


    if (body.message === "TokenCreated") {
        if (retry) return createNote(title, content, false);
        throw new TokenError();
    }

    if (body.error === "InvalidToken") throw new TokenError();
    if (body.error) throw new ApiError(res.status, body.error);

    // body.message === "NoteCreated" → success
}

export { createNote };

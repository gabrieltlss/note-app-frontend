import type { Note } from "../types/Notes";

async function fetchNotes(): Promise<Note[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, { credentials: "include" });
    const body = await res.json();
    console.log(body);

    if (body.error === "InvalidToken") {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, { credentials: "include" });
        const refreshBody = await refreshRes.json();
        console.log(refreshBody);
        if (refreshBody.error) return refreshBody.error;

        if (refreshBody.message === "TokenCreated") {
            const retryRes = await fetch(`${import.meta.env.VITE_API_URL}/notes`, { credentials: "include" });
            const retryBody = await retryRes.json();
            console.log(retryBody);
            if (retryBody.error) return retryBody.error;
            return retryBody as Note[];
        }
    }
    if (body.error) return body.error;
    return body as Note[];
}

export { fetchNotes };

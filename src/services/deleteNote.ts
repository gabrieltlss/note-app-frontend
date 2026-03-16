async function deleteNoteById(noteId: string) {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
        { credentials: "include", method: "DELETE" }
    );
    const body = await res.json();

    if (body.error === "InvalidToken") {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, { credentials: "include" });
        const refreshBody = await refreshRes.json();
        if (refreshBody.error) return refreshBody.error;

        if (refreshBody.message === "TokenCreated") {
            const retryRes = await fetch(
                `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
                { credentials: "include", method: "DELETE" }
            );
            const retryBody = await retryRes.json();
            if (retryBody.error) return retryBody.error;
            return retryBody.message;
        }
    }

    if (body.error) return body.error;
    return body.message;
}

export { deleteNoteById };
async function deleteNoteById(noteId: string) {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
        {
            credentials: "include",
            method: "DELETE",
            mode: "cors"
        }
    );
    const body = await res.json();
    console.log(body);

    if (body.error === "InvalidToken") {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, { credentials: "include" });
        const refreshBody = await refreshRes.json();
        console.log(refreshBody);
        if (refreshBody.error) return refreshBody.error;

        if (refreshBody.message === "TokenCreated") {
            const retryRes = await fetch(
                `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
                {
                    credentials: "include",
                    method: "DELETE",
                    mode: "cors"
                }
            );
            const retryBody = await retryRes.json();
            console.log(retryBody);
            if (retryBody.error) return retryBody.error;
            return retryBody.message;
        }
    }

    if (body.error) return body.error;
    return body.message;
}

export { deleteNoteById };
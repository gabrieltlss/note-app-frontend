async function fetchUser() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/account/user`, { credentials: "include" });
    const body = await res.json();

    if (body.error === "InvalidToken") {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, { credentials: "include" });
        const refreshBody = await refreshRes.json();
        if (refreshBody.error) return refreshBody.error;

        if (refreshBody.message === "TokenCreated") {
            const retryRes = await fetch(`${import.meta.env.VITE_API_URL}/account/user`, { credentials: "include" });
            const retryBody = await retryRes.json();
            if (retryBody.error) return retryBody.error;
            return retryBody as { id: number, email: string };
        }
    }

    if (body.error) return body.error;
    return body as { id: number, email: string };
}

export { fetchUser };
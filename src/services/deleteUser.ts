async function deleteUser() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/account/delete`, {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    console.log(res);
    const body = await res.json();
    console.log(body)

    if (body.error === "InvalidToken") {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, { credentials: "include" });
        const refreshBody = await refreshRes.json();
        if (refreshBody.error) return refreshBody.error;

        if (refreshBody.message === "TokenCreated") {
            const retryRes = await fetch(`${import.meta.env.VITE_API_URL}/account/DELETE`, {
                method: "DELETE",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const retryBody = await retryRes.json();
            if (retryBody.error) return retryBody.error;
            return retryBody.message;
        }
    }

    if (body.error) return body.error;
    return body.message;
}

export { deleteUser };
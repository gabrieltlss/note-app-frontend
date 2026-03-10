const BASE_URL = import.meta.env.VITE_API_URL;

export class TokenError extends Error {
    constructor() {
        super("InvalidToken");
        this.name = "TokenError";
    }
}

export class ApiError extends Error {
    status: number;
    errorCode: string;

    constructor(status: number, errorCode: string) {
        super(errorCode);
        this.name = "ApiError";
        this.status = status;
        this.errorCode = errorCode;
    }
}

export const api = {
    get: (path: string) =>
        fetch(`${BASE_URL}${path}`, { credentials: "include" }),

    post: (path: string, body: unknown) =>
        fetch(`${BASE_URL}${path}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }),
};

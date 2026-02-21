import { createContext, useState } from "react";
import type { IAppContext } from "../types/IAppContext";

const AppContext = createContext({} as IAppContext);

function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState("");

    const addToken = (token: string | null) => {
        if (token) { setToken(token); }
    }

    return (
        <AppContext.Provider value={{
            token,
            addToken
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
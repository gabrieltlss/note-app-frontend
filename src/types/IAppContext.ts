export type IAppContext = {
    token: string;
    addToken: (token: string | null) => void;
}
export type Note = {
    note_id: number;
    user_id: number;
    title: string;
    content: string;
    status: "active" | "archived";
    created_at: Date;
    updated_at: Date;
};
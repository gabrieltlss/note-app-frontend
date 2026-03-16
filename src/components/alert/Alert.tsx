import style from "./alert.module.css";

export default function Alert({ color, message }: { color: "pale-green" | "pale-red", message: string }) {
    return (
        <div className={`${style.alert} w3-panel w3-border w3-center w3-round-large w3-${color}`}>
            <p>{message}</p>
        </div>
    );
} 
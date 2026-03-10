import style from "./button.module.css";

export default function NewNotesBtn() {
    const openModal = () => {
        const modal = document.getElementById("modal");
        if (modal) modal.style.display = "block";
    };

    return (
        <button
            className={`w3-button w3-asphalt w3-circle w3-xlarge ${style.button}`}
            onClick={openModal}
        >
            +
        </button>
    );
}
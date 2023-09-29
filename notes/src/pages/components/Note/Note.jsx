import styles from "../Note/Note.module.css";

export default function Note({ title, content, timestamp, openModalClick }) {
    return (
        <div className={styles.note} onClick={openModalClick}>
            <h1>{title}</h1>
            <p>{content}</p>
            <span>{timestamp}</span>
        </div>
    );
}
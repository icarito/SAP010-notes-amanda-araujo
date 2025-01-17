import { useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase-config";
import { Navbar } from "../Navbar/Navbar";
import { TextBox } from "../TextBox/TextBox";
import styles from "../Modal/Modal.module.css";

export function Modal({
    title,
    description,
    close,
    deleteOption,
    idNote,
    date,
    time,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(description);

    async function editNote(noteId, newTitle, newContent) {
        const docRef = doc(db, "notes", noteId);
        await updateDoc(docRef, {
            titulo: newTitle,
            conteudo: newContent,
            timestamp: serverTimestamp(),
        });
        location.reload();
    }
    // test-hu1 test-hu2 test-hu3
    function handleClickDelete() {
        deleteOption();
        close();
    }

    return (
        <div className={styles.bgModal}>
            <div className={styles.modal}>
                {isEditing ? (
                    <>
                        <Navbar
                            returnClick={() => setIsEditing(false)}
                            saveNoteClick={() =>
                                editNote(idNote, editedTitle, editedContent)
                            }
                        />
                        <TextBox
                            onChangeTitle={(e) =>
                                setEditedTitle(e.target.value)
                            }
                            defaultTitle={title}
                            onChangeNote={(e) =>
                                setEditedContent(e.target.value)
                            }
                            defaultContent={description}
                        />
                    </>
                ) : (
                    <>
                        <button className={styles.returnBtn} onClick={close}></button>
                        <h2 className={styles.titleModal}>{title}</h2>
                        <p className={styles.descModal}>{description}</p>
                        <p>
                            {time}, {date}
                        </p>
                        <hr />
                        <div className={styles.optionsBtn}>
                            <button
                                className={styles.editBtn}
                                onClick={() => setIsEditing(true)}
                            ></button>
                            <button
                                className={styles.deleteBtn}
                                onClick={handleClickDelete}
                            ></button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

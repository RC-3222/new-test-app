import { Typography, TextField, Button } from "@mui/material";
import { FC, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { updateNote } from "../../../store/notes-slice";
import { BasicModal } from "../basic-modal";
import { parseTags } from "../../../helpers/parse-tags";

import styles from './edit-note-modal.module.scss'

type EditModalProps = {
    isOpen: boolean,
    handleClose: () => void,
    noteData: {
        id:string,
        title:string,
        text:string,
    }
}

export const EditNoteModal: FC<EditModalProps> = ({ isOpen, handleClose, noteData }) => {

    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>(noteData.title) 
    const [text, setText] = useState<string>(noteData.text)

    const handleSubmit: React.FormEventHandler = (ev) => {
        ev.preventDefault()

        dispatch(updateNote({id:noteData.id, title, text, tags: parseTags(text) }));

        handleClose()
    }

    return <BasicModal
        isOpen={isOpen}
        handleClose={handleClose}
    >
        <form className={styles.form} onSubmit={handleSubmit}>
            <Typography color='primary' id="edit-note-modal-title" variant="h6" component="h2">Edit Note</Typography>
            <TextField value={title} onChange={(ev)=>setTitle(ev.target.value)} fullWidth required={true} id="title-input" label="Title" variant="outlined" color='primary' />
            <TextField value={text} onChange={(ev)=>setText(ev.target.value)} fullWidth required multiline minRows={3} id="text-input" label="Text" variant="outlined" color='primary' />
            <Button sx={{alignSelf:'flex-end'}} type='submit' variant="outlined">Update Note</Button>
        </form>
    </BasicModal>
}
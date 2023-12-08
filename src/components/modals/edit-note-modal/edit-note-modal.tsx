import { Typography, TextField, Button, debounce } from "@mui/material";
import { ChangeEventHandler, FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { updateNote } from "../../../store/notes-slice";
import { BasicModal } from "../basic-modal";
import { parseTags } from "../../../helpers/parse-tags";

import styles from './edit-note-modal.module.scss'
import { NoteTags } from "../../note-tags";

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

    const [tmpTags, setTmpTags] = useState<string[]>(parseTags(noteData.text))

    const debouncedParseTmpTags = useMemo(()=>debounce(async (val:string)=>{
        setTmpTags(parseTags(val))
    }, 500), [])

    const updText: ChangeEventHandler<HTMLInputElement> = (ev) => {
        setText(ev.target.value)
        debouncedParseTmpTags(ev.target.value)
    }
    
    const updTitle: ChangeEventHandler<HTMLInputElement> = (ev) => {
        setTitle(ev.target.value)
    }

    useEffect(()=>{
        return debouncedParseTmpTags.clear()
    }, [])

    const handleSubmit: React.FormEventHandler = (ev) => {
        ev.preventDefault()

        dispatch(updateNote({id:noteData.id, title, text, tags: parseTags(text) }));

        debouncedParseTmpTags.clear()

        handleClose()
    }

    return <BasicModal
        isOpen={isOpen}
        handleClose={handleClose}
    >
        <form className={styles.form} onSubmit={handleSubmit}>
            <Typography color='primary' id="edit-note-modal-title" variant="h6" component="h2">Edit Note</Typography>
            <TextField value={title} onChange={updTitle} fullWidth required={true} id="title-input" label="Title" variant="outlined" color='primary' />
            <TextField value={text} onChange={updText} fullWidth required multiline minRows={3} id="text-input" label="Text" variant="outlined" color='primary' />
            {!!tmpTags.length && <NoteTags tags={tmpTags} />}
            <Button sx={{alignSelf:'flex-end'}} type='submit' variant="outlined">Update Note</Button>
        </form>
    </BasicModal>
}
import { Button, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addNote } from '../../../store/notes-slice';
import { BasicModal } from '../basic-modal';
import { parseTags } from '../../../helpers/parse-tags';

import styles from './add-note-modal.module.scss'


type AddNoteModalProps = {
    isOpen: boolean,
    handleClose: () => void
}

export const AddNoteModal: FC<AddNoteModalProps> = ({ isOpen, handleClose }) => {

    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')

    const handleSubmit: React.FormEventHandler = (ev) => {
        ev.preventDefault()

        dispatch(addNote({ title, text, tags:parseTags(text) }));

        setTitle('')
        setText('')

        handleClose()
    }

    return <BasicModal
        isOpen={isOpen}
        handleClose={handleClose}
    >
        <form className={styles.form} onSubmit={handleSubmit}>
            <Typography color='primary' id="add-note-modal-title" variant="h6" component="h2">Add Note</Typography>
            <TextField value={title} onChange={(ev) => setTitle(ev.target.value)} fullWidth required={true} id="title-input" label="Title" variant="outlined" color='primary' />
            <TextField value={text} onChange={(ev) => setText(ev.target.value)} fullWidth required multiline minRows={3} id="text-input" label="Text" variant="outlined" color='primary' />
            <Button sx={{ alignSelf: 'flex-end' }} type='submit' variant="outlined">Add Note</Button>
        </form>
    </BasicModal>
}
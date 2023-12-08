import { Button, TextField, Typography, debounce } from '@mui/material';
import { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addNote } from '../../../store/notes-slice';
import { BasicModal } from '../basic-modal';
import { parseTags } from '../../../helpers/parse-tags';

import styles from './add-note-modal.module.scss'
import { NoteTags } from '../../note-tags';


type AddNoteModalProps = {
    isOpen: boolean,
    handleClose: () => void
}

export const AddNoteModal: FC<AddNoteModalProps> = ({ isOpen, handleClose }) => {

    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')

    const [tmpTags, setTmpTags] = useState<string[]>([])

    const debouncedParseTmpTags = useMemo(()=>debounce(async (val:string)=>{
        setTmpTags(parseTags(val))
    }, 350), [])

    const updText: ChangeEventHandler<HTMLInputElement> = (ev) => {
        setText(ev.target.value)
        debouncedParseTmpTags(ev.target.value)
    }
    const updTitle: ChangeEventHandler<HTMLInputElement> = (ev) => {
        setTitle(ev.target.value)
    }

    const handleSubmit: React.FormEventHandler = (ev) => {
        ev.preventDefault()

        dispatch(addNote({ title, text, tags:parseTags(text) }));

        setTitle('')
        setText('')

        debouncedParseTmpTags.clear()
        handleClose()
    }

    useEffect(()=>{
        return debouncedParseTmpTags.clear()
    }, [])

    return <BasicModal
        isOpen={isOpen}
        handleClose={handleClose}
    >
        <form className={styles.form} onSubmit={handleSubmit}>
            <Typography color='primary' id="add-note-modal-title" variant="h6" component="h2">Add Note</Typography>
            <TextField value={title} onChange={updTitle} fullWidth required={true} id="title-input" label="Title" variant="outlined" color='primary' />
            <TextField value={text} onChange={updText} fullWidth required multiline minRows={3} id="text-input" label="Text" variant="outlined" color='primary' />
            {!!tmpTags.length && <NoteTags tags={tmpTags} />}
            <Button sx={{ alignSelf: 'flex-end' }} type='submit' variant="outlined">Add Note</Button>
        </form>
    </BasicModal>
}
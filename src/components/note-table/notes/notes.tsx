import { Container, Typography } from "@mui/material";
import { NoteCard } from "../../note-card";
import { useAppSelector } from "../../../store/hooks";
import { useMemo } from "react";

export const Notes = () => {

    const selectedTags = useAppSelector((state) => state.notes.selectedTags);
    const noteList = useAppSelector((state) => state.notes.noteList);

    const filteredNoteList = useMemo(
        () => noteList.filter((el) => (selectedTags.length ? selectedTags.every((tag) => el.tags.includes(tag)) ? true : false : true)),
        [noteList, selectedTags]
    )

    return <>
        <Typography
            variant='h3'
            color='primary'
            sx={{
                textAlign: 'center'
            }}>Notes</Typography>
        <Container
            sx={{
                flexGrow: 1,
                padding: '10px',
                gap: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'center',
            }}
        >
            {filteredNoteList.length
                ? filteredNoteList.map((el) => <NoteCard key={el.id} {...el} />)
                : <Typography
                    paragraph
                    sx={{
                        color: '#444',
                        textAlign: 'center'
                    }}>Couln't find any notes that have all selected tags (or any notes at all).</Typography>
            }
        </Container>
    </>
}
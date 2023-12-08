import { FC, useState } from 'react';
import { Card, Button, Container, CardHeader, Typography } from '@mui/material';
import { deleteNote } from '../../store/notes-slice';
import { highlightText } from '../../helpers/highlight-tags';
import { EditNoteModal } from '../modals';
import { NoteTags } from './note-tags';
import { Note } from '../../types/notes';
import { useAppDispatch } from '../../store/hooks';

type NoteCardProps = Note;

export const NoteCard: FC<NoteCardProps> = ({ title, text, id, tags }) => {
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDelete = () => {
        dispatch(deleteNote({ id }));
    }

    return (
        <Card
            variant='outlined'
            sx={{
                bgcolor:'whitesmoke',
                maxWidth: 'min(220px, 95%)',
                display: 'flex',
                minHeight: '250px',
                flexDirection: 'column',
                flex: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem 1.5rem',
                gap: '10px',
                boxShadow: 2,
                borderRadius:'10px',
            }}
        >
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
            }}>
                <CardHeader sx={{ fontSize: '24px' }} title={title}/>
                <Typography
                    paragraph
                    sx={{
                    overflowWrap: 'break-word',
                    hyphens: 'auto',
                    minHeight: '160px',
                    flex: 'auto',
                    width: '170px',
                    }}
                >{highlightText(text)}</Typography>
            </Container>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
            }}>
                <NoteTags tags={tags} />
                <Container sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                    <Button variant='outlined' color='error' onClick={handleDelete}>Delete</Button>
                    <Button variant='outlined' color='primary' onClick={()=>setIsModalOpen(true)}>Edit</Button>
                </Container>
            </Container>
            <EditNoteModal isOpen={isModalOpen} handleClose={()=>setIsModalOpen(false)} noteData={{id, title, text}} />
        </Card>
    );
};

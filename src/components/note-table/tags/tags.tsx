import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateSelectedTags } from "../../../store/notes-slice";

export const Tags: FC = () => {
    const allTags = useAppSelector((state) => state.notes.allTags);
    const selectedTags = useAppSelector((state) => state.notes.selectedTags);

    const dispatch = useAppDispatch();

    const handleTags = (
        _: React.MouseEvent<HTMLElement>,
        selectedTags: string[],
    ) => {
        dispatch(updateSelectedTags({ tags: selectedTags }))
    };

    return <>
        <Typography
            variant='h3'
            color='primary'
            sx={{
                textAlign: 'center'
            }}>Tags</Typography>
        {allTags.length
            ? <ToggleButtonGroup
                sx={{
                    bgcolor: 'whitesmoke',
                    boxShadow: 2,
                }}
                value={selectedTags}
                onChange={handleTags}
                aria-label="tags"
            >
                {allTags.map((tag) => <ToggleButton color='primary' key={tag} value={tag} aria-label={tag} sx={{textTransform:'none', fontSize:'1.5rem', padding:'.375rem .75rem'}}>
                    {tag}
                </ToggleButton>)}
            </ToggleButtonGroup>
            : <Typography
                paragraph
                sx={{
                    color: '#444',
                    textAlign: 'center'
                }}>Couln't find any tags.</Typography>
        }
    </>
}
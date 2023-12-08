import { FC } from 'react';
import { Box } from '@mui/material';
import { Tags } from './tags';
import { Notes } from './notes';


export const NoteTable: FC = () => {
  return (
    <Box
      sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width: 'min(1200px, 100vw)',
        margin: '0 auto',
        padding: '20px',
        gap:'15px',

      }}
    >
      <Tags />
      <Notes />
    </Box>
  );
};

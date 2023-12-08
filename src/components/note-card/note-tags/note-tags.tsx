import { FC } from 'react';
import { Box } from '@mui/material';

import styles from './note-tags.module.scss'

type NoteTagsProps = {
  tags: string[];
}

export const NoteTags: FC<NoteTagsProps> = ({ tags }) => {
    
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '5px',
        width: '100%',
        padding: '10px',
      }}
    >
      {tags.map((el) => (
        <span key={el} className={styles.tag}>
          {el}
        </span>
      ))}
    </Box>
  );
};
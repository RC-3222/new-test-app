import { FC, useState } from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import { AddNoteModal } from '../modals';

import styles from './header.module.scss'

export const Header: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <AppBar color='primary' position='static'>
      <Typography variant='h6' color='inherit' component='div'>
        <header className={styles.header}>
          <span className={styles.header__name}>Note Manager</span>
          <Button color='secondary' onClick={() => setIsModalOpen(true)} variant='outlined'>Add note</Button>
        </header>
        <AddNoteModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      </Typography>
    </AppBar>
  );
};

import { ThemeProvider } from '@mui/material/styles';
import { NoteTable } from './components/note-table';
import { Header } from './components/header';
import { theme } from './themes/main-theme';
import styles from './app.module.scss';

export const App = () => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <main className={styles.main}>
          <NoteTable />
        </main>
      </ThemeProvider>
    </>
  );
}

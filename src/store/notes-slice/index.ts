import { notesSlice } from './notes-slice'

export default notesSlice.reducer; 

export const { updateNote, deleteNote, addNote, updateSelectedTags } = notesSlice.actions;
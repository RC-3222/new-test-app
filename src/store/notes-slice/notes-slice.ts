import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { initialNoteList, initialTags } from './initial-values';
import { LOCALSTORAGE_NOTES_KEY } from '../../constants/local-storage';
import { Note } from '../../types/notes';
import { combineNoteTags } from './helpers';

type InitialNoteState = {
  noteList: Note[];
  allTags: string[];
  selectedTags: string[];
}

const initialState: InitialNoteState = {
  noteList: initialNoteList,
  allTags: initialTags,
  selectedTags: [],
};


export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    updateSelectedTags: (state, action: PayloadAction<{ tags:string[] }>) => {
      state.selectedTags = action.payload.tags
    },
    addNote: (state, action: PayloadAction<{ title:string, text:string, tags:string[] }>) => {
      const {title, text, tags} = action.payload;

      const id = uuid();
      state.noteList.push({id, title, text, tags});

      state.allTags = combineNoteTags(state.noteList);

      localStorage.setItem(LOCALSTORAGE_NOTES_KEY, JSON.stringify(state.noteList));
    },
    updateNote: (state, action: PayloadAction<{ id: string; title:string, text:string, tags:string[] }>) => {
      const {id, title, text, tags} = action.payload;

      const note = state.noteList.find(item=>item.id===id)!;

      note.title = title;
      note.text = text;
      note.tags = tags;

      state.allTags = combineNoteTags(state.noteList);

      localStorage.setItem(LOCALSTORAGE_NOTES_KEY, JSON.stringify(state.noteList));
    },
    deleteNote: (state, action: PayloadAction<{ id: string }>) => {
      state.noteList = state.noteList.filter(item=>item.id !== action.payload.id)

      state.allTags = combineNoteTags(state.noteList);
      
      localStorage.setItem(LOCALSTORAGE_NOTES_KEY, JSON.stringify(state.noteList));
    },
  },
});

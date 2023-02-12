import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INoteModel } from '../../interfaces/apiModels.types';
import { INotes } from '../../interfaces/reducers.types';


const initialState: INotes = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
    setDefaultNotes(state) {
      state.notes = [];
    },
    addAllNotes(state, action: PayloadAction<INoteModel[]>) {
      state.notes = action.payload;
    },
    addNote(state, action: PayloadAction<INoteModel>) {
      state.notes.push(action.payload);
    },
    updateNote(state, action: PayloadAction<INoteModel>) {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    removeNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export default notesSlice.reducer;
export const { setDefaultNotes, addAllNotes, addNote, updateNote, removeNote } =
  notesSlice.actions;

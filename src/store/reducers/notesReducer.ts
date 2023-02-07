import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: { notes: INote[] } = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
    setDefaultNotes(state) {
      state.notes = [];
    },
    addAllNotes(state, action: PayloadAction<INote[]>) {
      state.notes = action.payload;
    },
    addNote(state, action: PayloadAction<INote>) {
      state.notes.push(action.payload);
    },
    updateNote(state, action: PayloadAction<INote>) {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    removeNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    removeTag(state, action: PayloadAction<string>) {
      state.notes = state.notes.map((note) => ({
        ...note,
        body: note.body.replaceAll(action.payload, action.payload.slice(1)),
        tags: note.tags.filter((tag) => tag !== action.payload),
      }));
    },
  },
});

export default notesSlice.reducer;
export const { setDefaultNotes, addAllNotes, addNote, updateNote, removeNote, removeTag } =
  notesSlice.actions;

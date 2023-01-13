import { createSlice } from '@reduxjs/toolkit';


const initialState: { notes: INote[] } = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
    addAllNotes(state, action) {
      state.notes = action.payload;
    },
    addNote(state, action) {
      state.notes.push(action.payload);
    },
    updateNote(state, action) {
      state.notes = state.notes.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
    },
    removeNote(state, action) {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    removeTag(state, action) {
      state.notes = state.notes.map((note) => ({
        ...note,
        body: note.body.replaceAll(
          action.payload,
          action.payload.slice(1)
        ),
        tags: note.tags.filter((tag) => tag !== action.payload),
      }));
    },
  },
});

export default notesSlice.reducer;
export const { addAllNotes, addNote, updateNote, removeNote, removeTag } =
  notesSlice.actions;

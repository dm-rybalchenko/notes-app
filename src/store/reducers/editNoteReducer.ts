import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewNote, wrapChosenTag, wrapTag } from '../../utils/utils';

import { INoteModel } from '../../interfaces/apiModels.types';
import { IEditNote } from '../../interfaces/reducers.types';


const initialState: IEditNote = {
  note: createNewNote(),
  html: '',
  currentTags: [],
};

const editNoteSlice = createSlice({
  name: 'editNote',
  initialState,
  reducers: {
    setDefaultNote(state) {
      state.note = createNewNote();
      state.html = '';
      state.currentTags = [];
    },
    setNote(state, action: PayloadAction<INoteModel>) {
      state.note = action.payload;
    },
    setHtmlContent(state, action: PayloadAction<string>) {
      state.html = action.payload;
    },
    addTag(state, action: PayloadAction<string>) {
      if (!state.note.tags.includes(action.payload)) {
        state.note.tags.push(action.payload);
      }
    },
    highlightTag(state, action: PayloadAction<string>) {
      const tag = action.payload;

      if (state.currentTags.includes(tag)) {
        state.currentTags = state.currentTags.filter((item) => item !== tag);
        state.html = state.html.replaceAll(wrapChosenTag(tag), wrapTag(tag));
      } else {
        state.currentTags.push(tag);
        state.html = state.html.replaceAll(wrapTag(tag), wrapChosenTag(tag));
      }
    },
    removeTag(state, action: PayloadAction<string>) {
      const tag = action.payload;

      state.note.body = state.note.body.replaceAll(tag, tag.slice(1));
      state.note.tags = state.note.tags.filter((item) => item !== tag);

      if (state.currentTags.includes(tag)) {
        state.currentTags = state.currentTags.filter((item) => item !== tag);
        state.html = state.html.replaceAll(wrapChosenTag(tag), tag.slice(1));
      } else {
        state.html = state.html.replaceAll(wrapTag(tag), tag.slice(1));
      }
    },
  },
});

export default editNoteSlice.reducer;
export const {
  setDefaultNote,
  setNote,
  setHtmlContent,
  addTag,
  highlightTag,
  removeTag,
} = editNoteSlice.actions;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import notesSlice from './reducers/notesReducer';
import filterSlice from './reducers/filterReducer';
import paginationSlice from './reducers/paginationReducer';
import authSlice from './reducers/authReducer';
import editNoteSlice from './reducers/editNoteReducer';
import modalSlice from './reducers/modalReducer'


const rootReducer = combineReducers({
  notes: notesSlice,
  filter: filterSlice,
  pagination: paginationSlice,
  auth: authSlice,
  editNote: editNoteSlice,
  modal: modalSlice
});

export const store = configureStore({
  reducer: rootReducer,
});

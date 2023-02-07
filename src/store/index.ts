import { configureStore, combineReducers } from '@reduxjs/toolkit';
import notesSlice from './reducers/notesReducer';
import filterSlice from './reducers/filterReducer';
import paginationSlice from './reducers/paginationReducer';
import authSlice from './reducers/authReducer';
import editNoteSlice from './reducers/editNoteReducer';
import notificationSlice from './reducers/notificationReducer';


const rootReducer = combineReducers({
  notes: notesSlice,
  filter: filterSlice,
  pagination: paginationSlice,
  auth: authSlice,
  editNote: editNoteSlice,
  notification: notificationSlice
});

export const store = configureStore({
  reducer: rootReducer,
});

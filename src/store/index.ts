import { configureStore, combineReducers } from '@reduxjs/toolkit';

import notesSlice from './reducers/notesReducer';
import filterSlice from './reducers/filterReducer';
import paginationSlice from './reducers/paginationReducer';
import authSlice from './reducers/authReducer';
import editNoteSlice from './reducers/editNoteReducer';
import notificationSlice from './reducers/notificationReducer';
import popupSlice from './reducers/popupReducer';


const rootReducer = combineReducers({
  notes: notesSlice,
  filter: filterSlice,
  pagination: paginationSlice,
  auth: authSlice,
  editNote: editNoteSlice,
  notification: notificationSlice,
  popup: popupSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

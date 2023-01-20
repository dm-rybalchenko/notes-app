import { configureStore, combineReducers } from '@reduxjs/toolkit';
import notesSlice from './notesReducer';
import filterSlice from './filterReducer';
import paginationSlice from './paginationReducer';
import authSlice from './authReducer';


const rootReducer = combineReducers({
  notes: notesSlice,
  filter: filterSlice,
  pagination: paginationSlice,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

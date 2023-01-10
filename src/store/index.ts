import { configureStore, combineReducers } from "@reduxjs/toolkit";
import notesSlice from './notesReducer';
import filterSlice from "./filterReducer";
import paginationSlice from "./paginationReducer";


const rootReducer = combineReducers({
	notes: notesSlice,
	filter: filterSlice,
	pagination: paginationSlice,
})

export const store = configureStore({
	reducer: rootReducer,
})
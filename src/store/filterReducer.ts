import { createSlice } from '@reduxjs/toolkit';


const initialState: IFilter = {
  tags: [],
  query: '',
  sort: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDefaultFilter(state) {
      state.tags = [];
      state.query = '';
      state.sort = '';
    },
    searchNotes(state, action) {
      state.query = action.payload;
    },
    sortNotes(state, action) {
      state.sort = action.payload;
    },
    sortByTag(state, action) {
      if (state.tags.includes(action.payload)) {
        state.tags = state.tags.filter((tag) => tag !== action.payload);
      } else {
        state.tags.push(action.payload);
      }
    },
    removeTagFromSort(state, action) {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
    },
  },
});

export default filterSlice.reducer;
export const { setDefaultFilter, searchNotes, sortNotes, sortByTag, removeTagFromSort } =
  filterSlice.actions;

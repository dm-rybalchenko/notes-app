import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  page: 1,
  limit: 10,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
});

export default paginationSlice.reducer;
export const { setPage, setLimit } = paginationSlice.actions;

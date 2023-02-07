import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  page: 1,
  limit: 10,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setDefaultPages(state) {
      state.page = 1;
      state.limit = 10;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export default paginationSlice.reducer;
export const { setDefaultPages, setPage, setLimit } = paginationSlice.actions;

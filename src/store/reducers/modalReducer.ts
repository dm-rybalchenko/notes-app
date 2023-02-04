import { createSlice } from '@reduxjs/toolkit';


const initialState: IModal = {
  coords: null,
  title: '',
  body: '',
  callback: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal(state, action) {
      state.coords = action.payload.coords;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.callback = action.payload.callback;
    },
    removeModal(state) {
      state.coords = null;
      state.title = '';
      state.body = '';
      state.callback = null;
    },
  },
});

export default modalSlice.reducer;
export const { setModal, removeModal } = modalSlice.actions;

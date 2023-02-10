import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: IPopup = {
  popup: null,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, action: PayloadAction<IFile>) {
      state.popup = action.payload;
    },
    closePopup(state) {
      state.popup = null;
    },
  },
});

export default popupSlice.reducer;
export const { closePopup, showPopup } = popupSlice.actions;

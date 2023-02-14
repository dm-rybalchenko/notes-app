import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFileModel } from '../../interfaces/apiModels.types';
import { IPopup } from '../../interfaces/reducers.types';


const initialState: IPopup = {
  popup: null,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, action: PayloadAction<IFileModel>) {
      state.popup = action.payload;
    },
    closePopup(state) {
      state.popup = null;
    },
  },
});

export default popupSlice.reducer;
export const { closePopup, showPopup } = popupSlice.actions;

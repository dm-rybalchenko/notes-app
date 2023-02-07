import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: INotification = {
  error: null,
  warning: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    showWarning(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
    clearWarning(state) {
      state.warning = null;
    },
  },
});

export default notificationSlice.reducer;
export const { showError, clearError, showWarning, clearWarning } =
  notificationSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserModel } from '../../interfaces/apiModels.types';
import { IAuth } from '../../interfaces/reducers.types';


const initialState: IAuth = {
  user: {} as IUserModel,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setDefaultAuth(state) {
      state.user = {} as IUserModel;
      state.isAuth = false;
    },
    setUser(state, action: PayloadAction<IUserModel>) {
      state.user = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setDefaultAuth, setUser, setIsAuth } = authSlice.actions;

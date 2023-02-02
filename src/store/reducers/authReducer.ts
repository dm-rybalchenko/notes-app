import { createSlice } from '@reduxjs/toolkit';


const initialState: IAuth = {
  user: {} as IUser,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setDefaultAuth(state) {
      state.user = {} as IUser;
      state.isAuth = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setDefaultAuth, setUser, setIsAuth } = authSlice.actions;

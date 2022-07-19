import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../api/types';
import { serverToClientNaming } from '../../utils/convertNaming';

interface IState {
  data: TUser | null;
}

const initialState: IState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = serverToClientNaming(action.payload.user);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

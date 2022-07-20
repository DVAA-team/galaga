import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../api/types';
import { serverToClientNaming } from '../../utils/convertNaming';

interface IState {
  profile: TUser | null;
}

const initialState: IState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile(state, action) {
      state.profile = serverToClientNaming(action.payload);
    },
  },
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;

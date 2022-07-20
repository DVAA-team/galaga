import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUser } from '../../services/types';

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
    setUserProfile(state, action: PayloadAction<IState['profile']>) {
      state.profile = action.payload;
    },
  },
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;

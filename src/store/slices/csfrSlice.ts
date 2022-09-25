import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  token: string;
}

const initialState: IState = {
  token: '',
};

const csfrSlice = createSlice({
  name: 'csfr',
  initialState,
  reducers: {
    setCSFRToken(state, action: PayloadAction<IState['token']>) {
      state.token = action.payload;
    },
  },
});

export const { setCSFRToken } = csfrSlice.actions;

export default csfrSlice.reducer;

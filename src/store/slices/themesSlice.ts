import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TThemeItem = {
  name: string;
  colorVars: string;
  bgClass?: string;
};

interface IThemeState {
  darkMode: boolean;
  current: string;
  list: TThemeItem[];
}

const initialState: IThemeState = {
  darkMode: false,
  current: '',
  list: [],
};

const themesSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<IThemeState['darkMode']>) {
      state.darkMode = action.payload;
      document.documentElement.dataset.darkMode = String(state.darkMode);
    },
    setTheme(state, action: PayloadAction<IThemeState['current']>) {
      state.current = action.payload;
    },
  },
});

export const { setDarkMode, setTheme } = themesSlice.actions;

export default themesSlice.reducer;

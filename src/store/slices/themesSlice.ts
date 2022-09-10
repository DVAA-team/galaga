import changeBgClass from '@/utils/changeBgClass';
import changeTheme from '@/utils/changeTheme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TColorVars = {
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  warning: string;
  info: string;
  success: string;
};

export type TThemeItem = {
  id: number;
  name: string;
  colorVars: TColorVars;
  bgClass?: string;
};

interface IThemeState {
  darkMode: boolean;
  current: TThemeItem;
  list: TThemeItem[];
}

const initialState: IThemeState = {
  darkMode: false,
  current: {
    id: -1,
    name: '',
    colorVars: {
      accent: '',
      error: '',
      info: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
    },
  },
  list: [],
};

const themesSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<IThemeState['darkMode']>) {
      state.darkMode = action.payload;
      document.documentElement.dataset.darkMode = String(state.darkMode);

      if (state.darkMode) {
        changeBgClass(state.current?.bgClass);
      } else {
        changeBgClass('');
      }
    },
    setTheme(state, action: PayloadAction<TThemeItem>) {
      state.current = action.payload;
      changeTheme(state.current, state.darkMode);
    },
    setThemeList(state, action: PayloadAction<TThemeItem[]>) {
      state.list = action.payload;
    },
  },
});

export const { setDarkMode, setTheme, setThemeList } = themesSlice.actions;

export default themesSlice.reducer;

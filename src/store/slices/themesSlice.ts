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
    setTheme(state, action: PayloadAction<string>) {
      const theme = state.list.find(({ name }) => name === action.payload);
      if (!theme) {
        throw new Error('Выбрана несуществующая тема');
      }
      state.current = theme;
      changeTheme(theme, state.darkMode);
    },
  },
});

export const { setDarkMode, setTheme } = themesSlice.actions;

export default themesSlice.reducer;

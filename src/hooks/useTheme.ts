import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { TRootState } from '@/store';
import { setTheme } from '@/store/slices/themesSlice';

type TTheme = TRootState['themes']['current'];

type TSetThemes = (arg: ((theme: TTheme) => TTheme) | TTheme) => void;

export const useTheme = (): [TTheme, TSetThemes] => {
  const currentTheme = useAppSelector((state) => state.themes.current);
  const dispatch = useAppDispatch();

  return [
    currentTheme,
    (arg) => {
      if (typeof arg === 'function') {
        const res = arg(currentTheme);
        dispatch(setTheme(res));
      } else {
        dispatch(setTheme(arg));
      }
    },
  ];
};

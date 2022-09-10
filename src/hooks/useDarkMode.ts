import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setDarkMode } from '@/store/slices/themesSlice';

type TSetDarkMode = (arg: ((mode: boolean) => boolean) | boolean) => void;

export const useDarkMode = (): [boolean, TSetDarkMode] => {
  const darkMode = useAppSelector((state) => state.themes.darkMode);
  const dispatch = useAppDispatch();

  return [
    darkMode,
    (arg: ((mode: boolean) => boolean) | boolean) => {
      if (typeof arg === 'boolean') {
        dispatch(setDarkMode(arg));
      } else {
        const res = arg(darkMode);
        dispatch(setDarkMode(res));
      }
    },
  ];
};

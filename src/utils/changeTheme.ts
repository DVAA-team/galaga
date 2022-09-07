import type { TThemeItem } from '@/store/slices/themesSlice';
import changeBgClass from './changeBgClass';

export default function changeTheme(theme: TThemeItem, darkMode: boolean) {
  const styleNode = document.createElement('style');
  styleNode.setAttribute('id', 'theme');

  const themeStyleNode = document.querySelector('head > style#theme');
  if (!themeStyleNode) {
    document.head.append(styleNode);
  } else {
    themeStyleNode.replaceWith(styleNode);
  }

  if (darkMode) {
    changeBgClass(theme?.bgClass);
  } else {
    changeBgClass('');
  }
}

import type { TThemeItem } from '@/store/slices/themesSlice';
import createDebug from '@/utils/debug';
import colorVarsToString from '@/utils/colorVarsToString';
import changeBgClass from './changeBgClass';

const debug = createDebug('utils:changeTheme');

export default function changeTheme(theme: TThemeItem, darkMode: boolean) {
  const styleNode = document.createElement('style');
  const themeStyleNode = document.querySelector('head > style#theme');

  styleNode.setAttribute('id', 'theme');

  const ccsVars = colorVarsToString(theme.colorVars);
  if (ccsVars) {
    debug('Set color vars: {%s}', ccsVars);
    styleNode.textContent = `:root {${ccsVars};}`;
    if (!themeStyleNode) {
      document.head.append(styleNode);
    } else {
      themeStyleNode.replaceWith(styleNode);
    }
  } else {
    debug('Empty color vars');
    if (themeStyleNode) {
      debug('Remove old theme color vars');
      themeStyleNode.remove();
    }
  }

  if (darkMode) {
    debug('Change background to class name "%s"', theme?.bgClass);
    changeBgClass(theme?.bgClass);
  } else {
    debug('Light mode, clear background class');
    changeBgClass('');
  }
}

import type { TThemeItem } from '@/store/slices/themesSlice';

function hexToRgb(hex: string) {
  const results = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return results
    ? [
        parseInt(results[1], 16),
        parseInt(results[2], 16),
        parseInt(results[3], 16),
      ].join(' ')
    : '';
}

type TColorVars = TThemeItem['colorVars'];

export default function colorVarsToString(colorVars: TColorVars) {
  const cssVars = {
    /* eslint-disable @typescript-eslint/naming-convention */
    '--color-primary': hexToRgb(colorVars.primary),
    '--color-secondary': hexToRgb(colorVars.secondary),
    '--color-accent': hexToRgb(colorVars.accent),
    '--color-error': hexToRgb(colorVars.error),
    '--color-info': hexToRgb(colorVars.info),
    '--color-success': hexToRgb(colorVars.success),
    '--color-warning': hexToRgb(colorVars.warning),
    /* eslint-enable @typescript-eslint/naming-convention */
  };
  const stringCssVars = Object.entries(cssVars)
    .reduce<string[]>((acc, [key, value]) => {
      if (value) {
        acc.push(`${key}: ${value}`);
      }
      return acc;
    }, [])
    .join(';');

  return stringCssVars;
}

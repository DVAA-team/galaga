// @ts-check
/* eslint-disable import/no-extraneous-dependencies */
const plugin = require('tailwindcss/plugin');

/**
 * @typedef {Object} DefaultColors - Цвета тымы по умолчанию
 * @prop {string} primary - Основной цвет
 * @prop {string} secondary - Вторичный цвет
 * @prop {string} accent - Цвет акцента
 * @prop {string} error - Цвет ошибки
 * @prop {string} warning - Цвет предупреждения
 * @prop {string} info - Цвет информационного сообщения
 * @prop {string} success - Цвет успешного сообщения
 */

/**
 * @typedef {Object} PluginOptions - Опции плагина темизации
 * @prop {DefaultColors} defaultColors - Цвета тымы по умолчанию
 * @prop {boolean} toastify - Включить поддержку цветов в toastify
 * @prop {string[]} content - Контекст работы
 */

/**
 * Конвертирует цвет из HEX нотации в RGB
 * @param {string} hex - Цвет в HEX нотации
 * @returns string
 */
function hexToRgb(hex) {
  const results = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return results
    ? [
        parseInt(results[1], 16),
        parseInt(results[2], 16),
        parseInt(results[3], 16),
      ].join(' ')
    : '';
}

/** @type {ReturnType<typeof plugin.withOptions<PluginOptions>>} */
module.exports = plugin.withOptions(
  (options) => {
    const { defaultColors, toastify } = options;

    const cssVars = {
      /* eslint-disable @typescript-eslint/naming-convention */
      '--color-primary': hexToRgb(defaultColors.primary),
      '--color-secondary': hexToRgb(defaultColors.secondary),
      '--color-accent': hexToRgb(defaultColors.accent),
      '--color-error': hexToRgb(defaultColors.error),
      '--color-info': hexToRgb(defaultColors.info),
      '--color-success': hexToRgb(defaultColors.success),
      '--color-warning': hexToRgb(defaultColors.warning),
      /* eslint-enable @typescript-eslint/naming-convention */
    };

    if (toastify) {
      cssVars['--toastify-icon-color-success'] =
        'rgb(var(--color-success) / 100%)';
    }
    return ({ addBase }) => {
      addBase({
        /* eslint-disable @typescript-eslint/naming-convention */
        ':root': cssVars,
        /* eslint-enable @typescript-eslint/naming-convention */
      });
    };
  },

  ({ content }) => {
    return {
      content,
      darkMode: ['class', '[data-dark-mode="true"]'],
      theme: {
        extend: {
          colors: {
            primary: 'rgb(var(--color-primary) / <alpha-value>)',
            secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
            accent: 'rgb(var(--color-accent) / <alpha-value>)',
            error: 'rgb(var(--color-error) / <alpha-value>)',
            warning: 'rgb(var(--color-warning) / <alpha-value>)',
            info: 'rgb(var(--color-info) / <alpha-value>)',
            success: 'rgb(var(--color-success) / <alpha-value>)',
          },
        },
      },
    };
  }
);

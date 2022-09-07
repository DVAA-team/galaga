// @ts-check
const themesPlugin = require('./tailwind/plugins/themes');

const content = ['./src/**/*.{html,js,ts,tsx}'];

/** @type {import('tailwindcss').Config} */
const config = {
  content,
  plugins: [
    themesPlugin({
      defaultColors: {
        primary: '#3B82F6',
        secondary: '#F5F5F5',
        accent: '#6F72B9',
        error: '#b96f97',
        info: '#cdcdcd',
        success: '#6fb991',
        warning: '#b9b66f',
      },
      toastify: true,
      content,
    }),
  ],
};

module.exports = config;

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
        error: '#E91E63',
        info: '#6F72B9',
        success: '#6F72B9',
        warning: '#6F72B9',
      },
      toastify: true,
      content,
    }),
  ],
};

module.exports = config;

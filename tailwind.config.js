/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lightRed: '#e61e25',
        darkRed: '#b12025',
        darkGrey: '#292929',
      },
    },
  },
  plugins: [require('tailwindcss-font-inter')],
};

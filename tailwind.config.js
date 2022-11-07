/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lightRed: '#f33f3f',
        darkRed: '#1c0404',
      },
    },
  },
  plugins: [require('tailwindcss-font-inter')],
};

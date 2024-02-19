/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      navy: "#2B2D42",
      grey: "#B7BFCC",
      lgrey: "#EDF2F4",
      lred:"#EF233C",
      red: "#D90429",
    },
   
  },
  plugins: [
    require('tailwindcss-patterns'),
  ],
}

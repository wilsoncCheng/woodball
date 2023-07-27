/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#1fb6ff',
        'pink': 'rgba(0, 0, 0, 1)',
        'pink-500': 'rgba(0, 0, 0, .5)',
        'orange': '#ff7849',
      },
    },
  },
  plugins: [],
}
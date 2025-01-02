/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          100: '#fce4ec',
          200: '#f8bbd0',
        },
        blue: {
          500: '#2196f3',
        },
        gray: {
          500: '#9e9e9e',
        },
      },
    },
  },
  plugins: [],
} 
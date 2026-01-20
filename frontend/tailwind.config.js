/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-green': '#2e7d32',
        'agro-dark': '#1b5e20',
        'agro-light': '#81c784',
        'agro-accent': '#ff9800',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titleColor: "#3c4043",
        grayText: "#5f6368",
      }
    },
  },
  plugins: [],
}

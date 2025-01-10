/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellw': '#D2FF72',
        "bl": "#5D12D2",
        "whit": "#F0F3FF",
        "wh": "#D9D9D9",
        "dark-bl": "#3730A3",
        "d-bl": "#171043",
        "d-bg": "#1A210B",
        "d-v": "#C1BAED",
        "d-b": "#35317d",
        "d-g": "#777777",
        "yel": "#F7EC09",
        "vio": "#8F88FF",
        "bla": "#4338CA",
        "b": "#383838"
      }

    },
  },
  darkMode: 'selector',
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellw': '#CBF281',
        "bl": "#4731D3",
        "whit": "#FFFFFF",
        "wh": "#D9D9D9",
        "dark-bl": "#3730A3",
        "d-bl": "#171043",
        "d-bg": "#1A210B",
        "d-v": "#C1BAED",
        "d-b": "#35317d",
        "d-g": "#777777",
        "yel": "#fce408",
        "vio": "#8F88FF"
      }

    },
  },
  darkMode: 'selector',
  plugins: [],
}

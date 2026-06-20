/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        display: ['"Italiana"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0a0a0a",
        bone: "#f5f1ea",
        cream: "#ebe4d7",
        clay: "#b89968",
        ash: "#6b6b6b",
      },
    },
  },
  plugins: [],
}

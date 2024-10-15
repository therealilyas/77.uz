/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          default: "#999",
          100: "#F0F3F7",
          200: "#8E9297"
        },
        black: {
          default: "#fff",
          100: "#16191D"
        },
        blue: {
          100: "#388FF3"
        }
      }
    },
  },
  plugins: [],
}
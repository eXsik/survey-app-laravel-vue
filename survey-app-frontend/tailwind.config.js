/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#292d2d",
        tertiary: "#393939",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

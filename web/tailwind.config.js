/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        blue: {
          850: "#1E2733",
          950: "#151F2B",
        },
        orange: {
          650: "#FE8A00",
        },
        gray: {
          150: "#F5F5F5",
          250: "#D9D9D90D",
          350: "#CFCFCF99",
        },
      },
    },
  },
  plugins: [],
};

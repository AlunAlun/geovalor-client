/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0b2e2e",
          green: "#69b47c",
          lightgreen: "#b5e0b7",
          beige: "#f4efe7",
          dark: "#0A3B3F",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};




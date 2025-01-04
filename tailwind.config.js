/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#161718",
        text: "#E0E2E0",
        accent: "#C0DB4D",
      },
    },
  },
  plugins: [],
};

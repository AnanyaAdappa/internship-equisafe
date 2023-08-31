/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      merriweather: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        // Add Customs Colors Here
        accent: "#6c47ff",
        "bg-color": "#0c0129",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require("daisyui", "tailwind-scrollbar", "tw-elements/dist/plugin.cjs"),
  ],
  daisyui: {
    themes: [],
    styled: false,
    base: false,
  },
};

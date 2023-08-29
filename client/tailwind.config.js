/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Add Customs Colors Here
        accent: '#6c47ff',
        'bg-color': '#0c0129',
      },
    },
  },
  plugins: [require('daisyui', 'tailwind-scrollbar', 'tw-elements/dist/plugin.cjs')],
  daisyui: {
    themes: [],
    styled: false,
    base: false,
  },
};

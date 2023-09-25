/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    //fonts
    fontFamily: {
      oswald: ["Oswald", "sans-serif"],
      chakra: ["Chakra Petch", "sans-serif"],
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "retro"],
  },
};

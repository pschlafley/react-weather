/** @type {import('tailwindcss').Config} */
module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: [
    "./src/index.html",
    "./src/components/**/*.tsx",
    "./src/**/*.tsx",
  ],
  theme: {
    screens: {
      "mobile-s": "320px",
      "mobile-m": "375px",
      "mobile-l": "420px",
      tablet: "768px",
      laptop: "1024px",
      "laptop-l": "1440px",
      "desktop-4k": "2560px",
    },
  },
  plugins: [[require("@tailwindcss/forms"), require("daisyui")],],
}


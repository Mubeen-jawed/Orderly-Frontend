/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /bg-(orange|gray|green|red)-(500|600)/,
    },
    {
      pattern: /text-(white)/,
    },
  ],
};

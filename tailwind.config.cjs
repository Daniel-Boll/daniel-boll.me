import colors from "tailwindcss/colors.js";

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "class", // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            "[data-rehype-pretty-code-fragment]:nth-of-type(2) pre": {
              "[data-line]::before": {
                content: "counter(line)",
                counterIncrement: "line",
                display: "inline-block",
                width: "1rem",
                marginRight: "1rem",
                textAlign: "right",
                color: colors.slate[600],
              },
              "[data-highlighted-line]::before": {
                color: colors.slate[400],
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

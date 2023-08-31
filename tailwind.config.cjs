const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
// const config = require("./tailwind.theme.config.cjs");
//
// const themeConfig =
//   process.env.THEME_KEY && config[process.env.THEME_KEY]
//     ? config[process.env.THEME_KEY]
//     : config.default;
// const { colors } = themeConfig;

const linkHeadingStyles = {
  color: colors.gray[100],
  borderBottomColor: "transparent",
  "&:hover": {
    color: `${colors.gray[900]}`,
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@tailwindcss/typography")],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  safelist: ["dark"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        iosevka: ["Iosevka", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // ...colors,
        primary: {
          50: "#fff8f1",
          100: "#ffebd9",
          200: "#ffd1b3",
          300: "#ffad7d",
          400: "#ff8a4d",
          500: "#ff5c00",
          600: "#e64a00",
          700: "#c53a00",
          800: "#9a2b00",
          900: "#7a1e00",
        },
        secondary: {
          50: "#fff5f5",
          100: "#fed7d7",
          200: "#feb2b2",
          300: "#fc8181",
          400: "#f56565",
          500: "#e53e3e",
          600: "#c53030",
          700: "#9b2c2c",
          800: "#822727",
          900: "#63171b",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              background: "rgba(205, 200, 255, 0.05)",
            },
            "h2 a": linkHeadingStyles,
            "h3 a": linkHeadingStyles,
            "h4 a": linkHeadingStyles,
            "h5 a": linkHeadingStyles,
            "h6 a": linkHeadingStyles,
            blockquote: {
              fontSize: "90%",
              color: colors.zinc[500],
              borderLeftColor: colors.zinc[700],
              "p::before": { display: "none" },
              "p::after": { display: "none" },
            },
            a: {
              textDecoration: "none",
              borderBottom: `2px solid ${colors.cyan[800]}`,
              color: colors.cyan[400],
              transition:
                "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
              "&:hover": {
                color: `${colors.zinc[900]} !important`,
                borderBottomColor: `${colors.cyan[200]} !important`,
                background: colors.cyan[200],
              },
            },
            code: {
              color: "#86e1fc",
              "&::before": { content: `"" !important` },
              "&::after": { content: `"" !important` },
              fontWeight: "normal",
            },
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
  variants: {
    extend: { typography: ["dark"] },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

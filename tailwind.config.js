/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          base: "#121218",
          card: "rgba(139, 92, 246, 0.04)",
          raised: "rgba(196, 172, 80, 0.05)",
          border: "rgba(196, 172, 80, 0.08)",
        },
        brand: {
          300: "#E0CC82",
          400: "#C9B86A",
          500: "#B5A455",
          600: "#9A8C48",
          700: "#7A6F3A",
        },
        mystic: {
          300: "#B09AE0",
          400: "#9478CC",
          500: "#7058B3",
          600: "#5A449E",
          700: "#3D2D70",
        },
        accent: {
          lavender: "#B09AE0",
          amber: "#D4922A",
          ember: "#D45050",
        },
        content: {
          primary: "#E8E4DC",
          secondary: "#CFC3AB",
          muted: "#8A82A6",
        },
      },
    },
  },
  plugins: [],
};

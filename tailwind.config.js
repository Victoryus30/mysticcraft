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
          base: "#120B2E",
          card: "rgba(138, 90, 230, 0.08)",
          raised: "rgba(138, 90, 230, 0.12)",
          border: "rgba(168, 130, 255, 0.12)",
        },
        brand: {
          300: "#F0D060",
          400: "#E8C840",
          500: "#D4B030",
          600: "#B89828",
          700: "#8C7020",
        },
        mystic: {
          300: "#C8A8FF",
          400: "#A878F0",
          500: "#8A5AE6",
          600: "#6E40CC",
          700: "#4C2A99",
        },
        accent: {
          lavender: "#C8A8FF",
          amber: "#E8C840",
          ember: "#FF6B8A",
        },
        content: {
          primary: "#F0ECF8",
          secondary: "#C8C0E0",
          muted: "#8878A8",
        },
      },
    },
  },
  plugins: [],
};

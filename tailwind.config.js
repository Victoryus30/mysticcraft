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
          base: "#F8F6F0",
          card: "rgba(107, 143, 199, 0.06)",
          raised: "rgba(196, 162, 78, 0.08)",
          border: "rgba(107, 143, 199, 0.12)",
        },
        brand: {
          300: "#D4B85C",
          400: "#C4A24E",
          500: "#A88A3E",
          600: "#8E7434",
          700: "#6E5A28",
        },
        mystic: {
          300: "#94B4DC",
          400: "#6B8FC7",
          500: "#5478B0",
          600: "#3E5E94",
          700: "#2C4470",
        },
        accent: {
          lavender: "#B0A8D0",
          amber: "#C4A24E",
          ember: "#C87060",
        },
        content: {
          primary: "#2D2A3E",
          secondary: "#4A4660",
          muted: "#9490A8",
        },
      },
    },
  },
  plugins: [],
};

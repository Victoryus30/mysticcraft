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
          base: "#111316",
          card: "rgba(180, 160, 100, 0.04)",
          raised: "rgba(180, 160, 100, 0.06)",
          border: "rgba(180, 160, 100, 0.08)",
        },
        brand: {
          300: "#D4C48A",
          400: "#C4A86A",
          500: "#A89060",
          600: "#8E7A52",
          700: "#6E5E3E",
        },
        mystic: {
          300: "#A8C4BE",
          400: "#8AADA5",
          500: "#6D968D",
          600: "#577B74",
          700: "#3E5955",
        },
        accent: {
          lavender: "#A8C4BE",
          amber: "#C4A86A",
          ember: "#C47060",
        },
        content: {
          primary: "#DEE0DE",
          secondary: "#B8B4AC",
          muted: "#7A8086",
        },
      },
    },
  },
  plugins: [],
};

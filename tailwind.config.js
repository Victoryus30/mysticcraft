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
          base: "#0E1118",
          card: "rgba(120, 100, 180, 0.05)",
          raised: "rgba(184, 168, 120, 0.06)",
          border: "rgba(152, 144, 200, 0.08)",
        },
        brand: {
          300: "#D0C498",
          400: "#B8A878",
          500: "#9E9068",
          600: "#847858",
          700: "#665C42",
        },
        mystic: {
          300: "#C0B8D8",
          400: "#9890C8",
          500: "#7868B0",
          600: "#605098",
          700: "#443870",
        },
        accent: {
          lavender: "#C0B8D8",
          amber: "#B8A878",
          ember: "#C08070",
        },
        content: {
          primary: "#E0DDE8",
          secondary: "#B8B4C8",
          muted: "#706890",
        },
      },
    },
  },
  plugins: [],
};

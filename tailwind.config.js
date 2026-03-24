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
          base: "#0a0a0f",
          card: "rgba(139, 92, 246, 0.06)",
          raised: "rgba(212, 175, 55, 0.08)",
          border: "rgba(212, 175, 55, 0.12)",
        },
        brand: {
          300: "#F5D76E",
          400: "#E8C84A",
          500: "#D4AF37",
          600: "#B8962E",
          700: "#8B7225",
        },
        mystic: {
          300: "#C084FC",
          400: "#A855F7",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#4C1D95",
        },
        accent: {
          lavender: "#C084FC",
          amber: "#F59E0B",
          ember: "#EF4444",
        },
        content: {
          primary: "#F5F0E8",
          secondary: "#E8D5B5",
          muted: "#8B7FC4",
        },
      },
    },
  },
  plugins: [],
};

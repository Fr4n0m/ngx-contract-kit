import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.md",
    "./quickstart.md",
    "./demo.md",
    "./architecture.md",
    "./roadmap.md",
    "./.vitepress/**/*.{ts,js,vue,css}",
    "../../README.md",
    "../../ROADMAP.md"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f9f7",
          100: "#dbede5",
          200: "#b7dbc9",
          300: "#8cc4a8",
          400: "#5aa07f",
          500: "#3f8667",
          600: "#2e6b53",
          700: "#275544",
          800: "#224538",
          900: "#1f3b31"
        },
        ink: "#1d1f21",
        sand: "#f8f4ec"
      },
      fontFamily: {
        heading: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        card: "0 20px 40px -26px rgba(29, 31, 33, 0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;

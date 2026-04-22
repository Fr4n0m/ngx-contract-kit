import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./index.md",
    "./.vitepress/**/*.{ts,js,vue,css}",
    "./i18n/**/*.json"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f9faf6",
          100: "#f4f4ed",
          200: "#dde1d2",
          300: "#c7ccb9",
          400: "#b4b8a5",
          500: "#8b907f",
          600: "#686d5f",
          700: "#535450",
          800: "#343a26",
          900: "#282c20"
        },
        accent: "#d2ff00",
        ink: "#1f2319",
        sand: "#f8f4ec"
      },
      fontFamily: {
        project: ["Bruno Ace", "Ubuntu Sans Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
        heading: ["Ubuntu Sans Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
        body: ["Ubuntu Sans Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"]
      },
      boxShadow: {
        card: "0 20px 40px -26px rgba(29, 31, 33, 0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;

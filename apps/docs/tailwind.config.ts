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
          50: "#ffffff",
          100: "#ffffff",
          200: "#ffffff",
          300: "#d2ff00",
          400: "#d2ff00",
          500: "#1f1f1f",
          600: "#1f1f1f",
          700: "#1f1f1f",
          800: "#070707",
          900: "#070707"
        },
        accent: "#d2ff00",
        ink: "#1f1f1f",
        sand: "#ffffff"
      },
      fontFamily: {
        project: ["Bruno Ace", "Ubuntu Sans Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
        heading: ["Ubuntu Sans Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
        body: ["Ubuntu Sans Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"]
      },
      boxShadow: {
        card: "0 20px 40px -26px rgba(7, 7, 7, 0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;

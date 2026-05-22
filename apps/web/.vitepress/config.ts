import { defineConfig } from "vitepress";
import { en } from "../i18n";

export default defineConfig({
  title: en.meta.title,
  description: en.meta.description,
  lang: "en-US",
  lastUpdated: false,
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/favicon-96x96.png?v=20260423", sizes: "96x96" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=20260423" }],
    ["link", { rel: "shortcut icon", href: "/favicon.ico?v=20260423" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png?v=20260423" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "CmdKit" }],
    ["link", { rel: "manifest", href: "/site.webmanifest?v=20260423" }]
  ],
  themeConfig: {
    nav: [],
    sidebar: false,
    outline: false,
    socialLinks: [{ icon: "github", link: en.links.githubRepo }]
  }
});


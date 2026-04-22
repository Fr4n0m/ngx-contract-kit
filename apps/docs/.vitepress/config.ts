import { defineConfig } from "vitepress";
import { en } from "../i18n";

export default defineConfig({
  title: en.meta.title,
  description: en.meta.description,
  lang: "en-US",
  lastUpdated: false,
  cleanUrls: true,
  themeConfig: {
    nav: [],
    sidebar: false,
    outline: false,
    socialLinks: [{ icon: "github", link: en.links.githubRepo }]
  }
});


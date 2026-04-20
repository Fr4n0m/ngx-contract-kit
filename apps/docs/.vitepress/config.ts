import { defineConfig } from "vitepress";
import en from "../i18n/en.json";

export default defineConfig({
  title: en.meta.title,
  description: en.meta.description,
  lang: "en-US",
  themeConfig: {
    nav: [],
    sidebar: false,
    socialLinks: [{ icon: "github", link: en.links.githubRepo }]
  }
});

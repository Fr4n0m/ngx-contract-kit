import { defineConfig } from "vitepress";
import en from "../i18n/en.json";

export default defineConfig({
  title: en.meta.title,
  description: en.meta.description,
  lang: "en-US",
  lastUpdated: false,
  cleanUrls: true,
  themeConfig: {
    nav: [],
    sidebar: {
      "/docs/": [
        {
          text: "Documentation",
          items: [
            { text: "Overview", link: "/docs/" },
            { text: "Quickstart", link: "/docs/quickstart" },
            { text: "CLI Reference", link: "/docs/cli-reference" },
            { text: "Contract Schema", link: "/docs/contract-schema" },
            { text: "Generators", link: "/docs/generators" },
            { text: "Versioning", link: "/docs/versioning" },
            { text: "Examples", link: "/docs/examples" },
            { text: "Contributing", link: "/docs/contributing" },
            { text: "FAQ", link: "/docs/faq" }
          ]
        }
      ]
    },
    outline: false,
    socialLinks: [{ icon: "github", link: en.links.githubRepo }]
  }
});

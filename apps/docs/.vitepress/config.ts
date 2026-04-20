import { defineConfig } from "vitepress";

export default defineConfig({
  title: "ngx-contract-kit",
  description: "Contract-first toolkit for Angular + backend teams",
  lang: "en-US",
  themeConfig: {
    nav: [
      { text: "Demo", link: "/demo" },
      { text: "Quickstart", link: "/quickstart" },
      { text: "Architecture", link: "/architecture" },
      { text: "Roadmap", link: "/roadmap" },
      { text: "GitHub", link: "https://github.com/Fr4n0m/ngx-contract-kit" }
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Home", link: "/" },
          { text: "Quickstart", link: "/quickstart" },
          { text: "Demo", link: "/demo" }
        ]
      },
      {
        text: "Project",
        items: [
          { text: "Architecture", link: "/architecture" },
          { text: "Roadmap", link: "/roadmap" }
        ]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Fr4n0m/ngx-contract-kit" }],
    footer: {
      message: "MIT Licensed - Built in public.",
      copyright: "Copyright 2026"
    }
  }
});

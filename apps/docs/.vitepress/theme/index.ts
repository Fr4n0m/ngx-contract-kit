import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h, Fragment } from "vue";
import LandingPage from "./components/LandingPage.vue";
import HeaderLangSwitch from "./components/HeaderLangSwitch.vue";
import HeaderNavLinks from "./components/HeaderNavLinks.vue";
import "./custom.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "nav-bar-content-before": () => h(HeaderNavLinks),
      "nav-bar-content-after": () => h(Fragment, null, [h(HeaderLangSwitch)])
    }),
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("LandingPage", LandingPage);
  }
};

export default theme;

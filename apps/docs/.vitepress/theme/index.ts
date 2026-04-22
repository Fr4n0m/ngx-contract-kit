import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h, Fragment } from "vue";
import LandingPage from "./components/LandingPage.vue";
import HeaderLangSwitch from "./components/HeaderLangSwitch.vue";
import HeaderNavLinks from "./components/HeaderNavLinks.vue";
import GlobalFooter from "./components/GlobalFooter.vue";
import ProjectCommandPalette from "./components/ProjectCommandPalette.vue";
import DocsSidebar from "./components/DocsSidebar.vue";
import InstallCommandSelector from "./components/InstallCommandSelector.vue";
import QuickstartGuide from "./components/QuickstartGuide.vue";
import TerminalCommandList from "./components/TerminalCommandList.vue";
import TerminalCodeBlock from "./components/TerminalCodeBlock.vue";
import "./custom.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "nav-bar-content-before": () => h(HeaderNavLinks),
      "nav-bar-content-after": () => h(Fragment, null, [h(HeaderLangSwitch)]),
      "layout-top": () => h(ProjectCommandPalette),
      "doc-before": () => h(DocsSidebar),
      "layout-bottom": () => h(GlobalFooter)
    }),
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("LandingPage", LandingPage);
    ctx.app.component("InstallCommandSelector", InstallCommandSelector);
    ctx.app.component("QuickstartGuide", QuickstartGuide);
    ctx.app.component("TerminalCommandList", TerminalCommandList);
    ctx.app.component("TerminalCodeBlock", TerminalCodeBlock);
  }
};

export default theme;

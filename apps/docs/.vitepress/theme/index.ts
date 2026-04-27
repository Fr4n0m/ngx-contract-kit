import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h, Fragment } from "vue";
import LandingPage from "./components/LandingPage.vue";
import HeaderLangSwitch from "./components/HeaderLangSwitch.vue";
import HeaderNavLinks from "./components/HeaderNavLinks.vue";
import GlobalFooter from "./components/GlobalFooter.vue";
import ProjectCommandPalette from "./components/ProjectCommandPalette.vue";
import DocsSidebar from "./components/DocsSidebar.vue";
import LayoutBackground from "./components/LayoutBackground.vue";
import InstallCommandSelector from "./components/InstallCommandSelector.vue";
import QuickstartGuide from "./components/QuickstartGuide.vue";
import TerminalCommandList from "./components/TerminalCommandList.vue";
import TerminalCodeBlock from "./components/TerminalCodeBlock.vue";
import DocsHomeContent from "./components/docs/DocsHomeContent.vue";
import CliReferenceContent from "./components/docs/CliReferenceContent.vue";
import ContractSchemaContent from "./components/docs/ContractSchemaContent.vue";
import GeneratorsContent from "./components/docs/GeneratorsContent.vue";
import ExamplesContent from "./components/docs/ExamplesContent.vue";
import ContributingContent from "./components/docs/ContributingContent.vue";
import FaqContent from "./components/docs/FaqContent.vue";
import "./custom.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "nav-bar-content-before": () => h(HeaderNavLinks),
      "nav-bar-content-after": () => h(Fragment, null, [h(HeaderLangSwitch)]),
      "layout-top": () => h(Fragment, null, [h(LayoutBackground), h(ProjectCommandPalette)]),
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
    ctx.app.component("DocsHomeContent", DocsHomeContent);
    ctx.app.component("CliReferenceContent", CliReferenceContent);
    ctx.app.component("ContractSchemaContent", ContractSchemaContent);
    ctx.app.component("GeneratorsContent", GeneratorsContent);
    ctx.app.component("ExamplesContent", ExamplesContent);
    ctx.app.component("ContributingContent", ContributingContent);
    ctx.app.component("FaqContent", FaqContent);
  }
};

export default theme;

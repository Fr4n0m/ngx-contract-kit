import metaEn from "./en/meta.json";
import langEn from "./en/lang.json";
import navEn from "./en/nav.json";
import docsNavEn from "./en/docsNav.json";
import quickstartEn from "./en/quickstart.json";
import heroEn from "./en/hero.json";
import cardsEn from "./en/cards.json";
import whatYouGetEn from "./en/whatYouGet.json";
import howItWorksEn from "./en/howItWorks.json";
import commandPaletteEn from "./en/commandPalette.json";
import footerEn from "./en/footer.json";
import linksEn from "./en/links.json";

import metaEs from "./es/meta.json";
import langEs from "./es/lang.json";
import navEs from "./es/nav.json";
import docsNavEs from "./es/docsNav.json";
import quickstartEs from "./es/quickstart.json";
import heroEs from "./es/hero.json";
import cardsEs from "./es/cards.json";
import whatYouGetEs from "./es/whatYouGet.json";
import howItWorksEs from "./es/howItWorks.json";
import commandPaletteEs from "./es/commandPalette.json";
import footerEs from "./es/footer.json";
import linksEs from "./es/links.json";

export const en = {
  meta: metaEn,
  lang: langEn,
  nav: navEn,
  docsNav: docsNavEn,
  quickstart: quickstartEn,
  hero: heroEn,
  cards: cardsEn,
  whatYouGet: whatYouGetEn,
  howItWorks: howItWorksEn,
  commandPalette: commandPaletteEn,
  footer: footerEn,
  links: linksEn
} as const;

export const es = {
  meta: metaEs,
  lang: langEs,
  nav: navEs,
  docsNav: docsNavEs,
  quickstart: quickstartEs,
  hero: heroEs,
  cards: cardsEs,
  whatYouGet: whatYouGetEs,
  howItWorks: howItWorksEs,
  commandPalette: commandPaletteEs,
  footer: footerEs,
  links: linksEs
} as const;

export type LocaleDictionary = typeof en;

import metaEn from "./en/meta.json";
import langEn from "./en/lang.json";
import navEn from "./en/nav.json";
import docsNavEn from "./en/docsNav.json";
import quickstartEn from "./en/quickstart.json";
import heroEn from "./en/hero.json";
import cardsEn from "./en/cards.json";
import whatYouGetEn from "./en/whatYouGet.json";
import howItWorksEn from "./en/howItWorks.json";
import demoEn from "./en/demo.json";
import commandPaletteEn from "./en/commandPalette.json";
import footerEn from "./en/footer.json";
import linksEn from "./en/links.json";
import docsHomeEn from "./en/docsHome.json";
import cliReferenceEn from "./en/cliReference.json";
import contractSchemaEn from "./en/contractSchema.json";
import generatorsEn from "./en/generators.json";
import examplesEn from "./en/examples.json";
import contributingEn from "./en/contributing.json";
import faqEn from "./en/faq.json";

import metaEs from "./es/meta.json";
import langEs from "./es/lang.json";
import navEs from "./es/nav.json";
import docsNavEs from "./es/docsNav.json";
import quickstartEs from "./es/quickstart.json";
import heroEs from "./es/hero.json";
import cardsEs from "./es/cards.json";
import whatYouGetEs from "./es/whatYouGet.json";
import howItWorksEs from "./es/howItWorks.json";
import demoEs from "./es/demo.json";
import commandPaletteEs from "./es/commandPalette.json";
import footerEs from "./es/footer.json";
import linksEs from "./es/links.json";
import docsHomeEs from "./es/docsHome.json";
import cliReferenceEs from "./es/cliReference.json";
import contractSchemaEs from "./es/contractSchema.json";
import generatorsEs from "./es/generators.json";
import examplesEs from "./es/examples.json";
import contributingEs from "./es/contributing.json";
import faqEs from "./es/faq.json";

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
  demo: demoEn,
  commandPalette: commandPaletteEn,
  footer: footerEn,
  links: linksEn,
  docsHome: docsHomeEn,
  cliReference: cliReferenceEn,
  contractSchema: contractSchemaEn,
  generators: generatorsEn,
  examples: examplesEn,
  contributing: contributingEn,
  faq: faqEn
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
  demo: demoEs,
  commandPalette: commandPaletteEs,
  footer: footerEs,
  links: linksEs,
  docsHome: docsHomeEs,
  cliReference: cliReferenceEs,
  contractSchema: contractSchemaEs,
  generators: generatorsEs,
  examples: examplesEs,
  contributing: contributingEs,
  faq: faqEs
} as const;

export type LocaleDictionary = typeof en;

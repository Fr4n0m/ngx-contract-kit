<script setup lang="ts">
import { computed } from "vue";
import { CommandPalette } from "@cmd-kit/vue";
import type { CommandSection, CommandThemeInput } from "@cmd-kit/vue";
import en from "../../../i18n/en.json";
import es from "../../../i18n/es.json";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].commandPalette);

const sections = computed<CommandSection[]>(() => [
  {
    id: "product",
    title: t.value.sections.product,
    items: t.value.items.product
  },
  {
    id: "docs",
    title: t.value.sections.docs,
    items: t.value.items.docs
  },
  {
    id: "community",
    title: t.value.sections.community,
    items: t.value.items.community
  }
]);

const theme = computed<CommandThemeInput>(() => ({
  light: {
    accentColor: "#b6dd00",
    backgroundColor: "#cbd3c7",
    textColor: "#11170f",
    titleColor: "#11170f",
    descriptionColor: "#1f281b",
    mutedColor: "#445543",
    sectionTitleColor: "#445543",
    itemTitleColor: "#11170f",
    itemSubtitleColor: "#33402c",
    shortcutColor: "#58695a",
    borderColor: "#95a48f",
    overlayColor: "rgba(12, 18, 10, 0.38)",
    radius: "16px",
    shadow: "0 24px 60px -26px rgba(20, 27, 19, 0.5)"
  },
  dark: {
    accentColor: "#d2ff00",
    backgroundColor: "#1b2218",
    textColor: "#f4f4ed",
    titleColor: "#f4f4ed",
    descriptionColor: "#dde1d2",
    mutedColor: "#a4b09a",
    sectionTitleColor: "#d2ff00",
    itemTitleColor: "#f4f4ed",
    itemSubtitleColor: "#c8cfbd",
    shortcutColor: "#c6dc7f",
    borderColor: "#374531",
    overlayColor: "rgba(5, 10, 7, 0.72)",
    radius: "16px",
    shadow: "0 24px 64px -24px rgba(0, 0, 0, 0.7)"
  }
}));
</script>

<template>
  <CommandPalette
    :sections="sections"
    :messages="t.messages"
    :theme="theme"
    :recents="{ limit: 6, sectionTitle: t.recentsSectionTitle }"
    title="contract-kit"
    shortcut="mod+k"
  />
</template>

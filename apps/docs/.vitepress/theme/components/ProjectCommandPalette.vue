<script setup lang="ts">
import { computed, type Component } from "vue";
import { useData } from "vitepress";
import { CommandPalette } from "@cmd-kit/vue";
import type {
  CommandItem,
  CommandSection,
  CommandThemeInput,
} from "@cmd-kit/vue";
import {
  IconBook2,
  IconBolt,
  IconBraces,
  IconBrandGithub,
  IconChecklist,
  IconCodeCircle2,
  IconFileDescription,
  IconFlask2,
  IconFolder,
  IconHome2,
  IconInfoCircle,
  IconMessages,
  IconRoute2,
  IconSearch,
  IconSettingsCode,
  IconSparkles,
  IconUserHeart,
} from "@tabler/icons-vue";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();
const { isDark } = useData();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].commandPalette);

const sectionIconById: Record<string, Component> = {
  product: IconSparkles,
  docs: IconBook2,
  community: IconMessages,
  recent: IconSearch,
};

const itemIconById: Record<string, Component> = {
  home: IconHome2,
  "what-you-get": IconChecklist,
  "how-it-works": IconRoute2,
  "docs-overview": IconInfoCircle,
  "docs-quickstart": IconBolt,
  "docs-cli": IconCodeCircle2,
  "docs-schema": IconBraces,
  "docs-generators": IconSettingsCode,
  "docs-examples": IconFlask2,
  "docs-contributing": IconUserHeart,
  "docs-faq": IconFileDescription,
  "github-repo": IconBrandGithub,
  "fr4nom-site": IconFolder,
};

const docsGroups = computed<CommandSection[]>(() =>
  t.value.docsGroups.map((group) => ({
    id: group.id,
    title: group.title,
    items: group.items as CommandItem[],
  })),
);

const sections = computed<CommandSection[]>(() => [
  {
    id: "product",
    title: t.value.sections.product,
    items: t.value.items.product as CommandItem[],
  },
  {
    id: "docs",
    title: t.value.sections.docs,
    items: [
      {
        id: "docs-nested",
        title: t.value.docsNested.title,
        subtitle: t.value.docsNested.subtitle,
        icon: "docs",
        children: docsGroups.value,
      },
    ],
  },
  {
    id: "community",
    title: t.value.sections.community,
    items: t.value.items.community as CommandItem[],
  },
]);

const sectionIcons = computed<Record<string, Component>>(() => ({
  [t.value.sections.product]: sectionIconById.product,
  [t.value.sections.docs]: sectionIconById.docs,
  [t.value.sections.community]: sectionIconById.community,
  [t.value.recentsSectionTitle]: sectionIconById.recent,
  ...Object.fromEntries(
    t.value.docsGroups.map((group) => [group.title, IconBook2]),
  ),
}));

const resolveSectionIcon = (title: string): Component =>
  sectionIcons.value[title] ?? IconBook2;
const resolveItemIcon = (item: CommandItem): Component =>
  itemIconById[item.id] ?? IconBook2;

const formatShortcut = (shortcut: string) =>
  shortcut
    .split("+")
    .map((token) => token.trim())
    .filter(Boolean)
    .map((token) => {
      const normalized = token.toLowerCase();
      if (normalized === "mod") {
        return typeof navigator !== "undefined" &&
          navigator.userAgent.includes("Mac")
          ? "Cmd"
          : "Ctrl";
      }
      if (normalized.length === 1) {
        return normalized.toUpperCase();
      }
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join(" + ");

const lightTheme = {
  accentColor: "#d2ff00",
  backgroundColor: "#ffffff",
  textColor: "#070707",
  titleColor: "#070707",
  descriptionColor: "#1f1f1f",
  mutedColor: "#1f1f1f",
  sectionTitleColor: "#1f1f1f",
  itemTitleColor: "#070707",
  itemSubtitleColor: "#1f1f1f",
  shortcutColor: "#1f1f1f",
  borderColor: "#1f1f1f",
  overlayColor: "rgba(31, 31, 31, 0.33)",
  radius: "20px",
  shadow: "0 20px 50px -24px rgba(7, 7, 7, 0.35)"
} as const;

const darkTheme = {
  accentColor: "#d2ff00",
  backgroundColor: "#070707",
  textColor: "#ffffff",
  titleColor: "#ffffff",
  descriptionColor: "#ffffff",
  mutedColor: "#ffffff",
  sectionTitleColor: "#d2ff00",
  itemTitleColor: "#ffffff",
  itemSubtitleColor: "#ffffff",
  shortcutColor: "#ffffff",
  borderColor: "#1f1f1f",
  overlayColor: "rgba(7, 7, 7, 0.72)",
  radius: "16px",
  shadow: "0 24px 64px -24px rgba(0, 0, 0, 0.7)"
} as const;

const theme = computed<CommandThemeInput>(() =>
  isDark.value ? darkTheme : lightTheme
);

const classNames = {
  item: "ck-cmd-item",
  closeButton: "ck-cmd-close-btn"
} as const;
</script>

<template>
  <CommandPalette
    :sections="sections"
    :messages="t.messages"
    :theme="theme"
    :class-names="classNames"
    :recents="{ limit: 6, sectionTitle: t.recentsSectionTitle }"
    title="contract-kit"
    shortcut="mod+k"
  >
    <template #section-title="{ title }">
      <span class="inline-flex items-center gap-2">
        <component :is="resolveSectionIcon(title)" :size="20" />
        <span>{{ title }}</span>
      </span>
    </template>
    <template #item="{ item, active }">
      <div class="flex w-full items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-2">
          <component
            :is="resolveItemIcon(item)"
            :size="30"
            class="shrink-0"
            :class="
              active
                ? 'text-[color:var(--vp-c-text-1)]'
                : 'text-[color:var(--vp-c-text-2)]'
            "
          />
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold">{{ item.title }}</p>
            <p
              v-if="item.subtitle"
              class="truncate text-xs text-[color:var(--vp-c-text-2)]"
            >
              {{ item.subtitle }}
            </p>
          </div>
        </div>
        <span
          v-if="item.shortcut"
          class="text-xs text-[color:var(--vp-c-text-3)]"
        >
          {{ formatShortcut(item.shortcut) }}
        </span>
        <span
          v-else-if="item.children?.length"
          class="text-xs text-[color:var(--vp-c-text-3)]"
          >Enter</span
        >
      </div>
    </template>
  </CommandPalette>
</template>


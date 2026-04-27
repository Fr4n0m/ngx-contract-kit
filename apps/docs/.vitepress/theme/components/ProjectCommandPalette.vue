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
  sectionTitleColor: "#070707",
  itemTitleColor: "#070707",
  itemSubtitleColor: "#1f1f1f",
  shortcutColor: "#1f1f1f",
  borderColor: "#1f1f1f",
  overlayColor: "rgba(31, 31, 31, 0.33)",
  radius: "20px",
  shadow: "0 20px 50px -24px rgba(7, 7, 7, 0.35)",
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
  shadow: "0 24px 64px -24px rgba(0, 0, 0, 0.7)",
} as const;

const theme = computed<CommandThemeInput>(() =>
  isDark.value ? darkTheme : lightTheme,
);

const classNames = {
  item: "ck-cmd-item",
  closeButton: "ck-cmd-close-btn",
} as const;

const openPalette = () => {
  if (typeof window === "undefined") return;
  const trigger = (withMeta: boolean, withCtrl: boolean) =>
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        code: "KeyK",
        metaKey: withMeta,
        ctrlKey: withCtrl,
        bubbles: true,
        cancelable: true,
      }),
    );

  trigger(false, true);
  trigger(true, false);
};
</script>

<template>
  <div>
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

    <button
      type="button"
      class="btn-small"
      :aria-label="`command — ${t.trigger.label}`"
      :title="`${t.trigger.label} (${t.trigger.hint})`"
      @click="openPalette"
    >
      <div class="btn-small-content">
        <div class="btn-small-icon">
          <svg
            xml:space="preserve"
            style="enable-background: new 0 0 80 80"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <g>
              <path
                d="M64,48L64,48h-8V32h8c8.836,0,16-7.164,16-16S72.836,0,64,0c-8.837,0-16,7.164-16,16v8H32v-8c0-8.836-7.164-16-16-16
S0,7.164,0,16s7.164,16,16,16h8v16h-8l0,0l0,0C7.164,48,0,55.164,0,64s7.164,16,16,16c8.837,0,16-7.164,16-16l0,0v-8h16v7.98
c0,0.008-0.001,0.014-0.001,0.02c0,8.836,7.164,16,16,16s16-7.164,16-16S72.836,48.002,64,48z M64,8c4.418,0,8,3.582,8,8
s-3.582,8-8,8h-8v-8C56,11.582,59.582,8,64,8z M8,16c0-4.418,3.582-8,8-8s8,3.582,8,8v8h-8C11.582,24,8,20.417,8,16z M16,72
c-4.418,0-8-3.582-8-8s3.582-8,8-8l0,0h8v8C24,68.418,20.418,72,16,72z M32,48V32h16v16H32z M64,72c-4.418,0-8-3.582-8-8l0,0v-8
h7.999c4.418,0,8,3.582,8,8S68.418,72,64,72z"
              ></path>
            </g>
          </svg>
        </div>
        <p class="btn-small-text">command</p>
      </div>
    </button>
  </div>
</template>

<style scoped>
.btn-small {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 80;
  padding: 0;
  width: 52px;
  height: 52px;
  border: 2px solid #1f1f1f;
  outline: none;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 10px 22px rgba(7, 7, 7, 0.18),
    0 2px 8px rgba(7, 7, 7, 0.12);
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

:global(.dark) .btn-small {
  border-color: #1f1f1f !important;
  background-color: #070707 !important;
  box-shadow:
    0 12px 26px rgba(0, 0, 0, 0.72),
    0 1px 0 rgba(210, 255, 0, 0.12) inset;
}

.btn-small:hover {
  transform: scale(1.1);
  border-color: #d2ff00;
  box-shadow:
    0 12px 24px rgba(7, 7, 7, 0.24),
    0 2px 8px rgba(7, 7, 7, 0.16),
    0 0 0 2px rgba(210, 255, 0, 0.25);
}

:global(.dark) .btn-small:hover {
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.8),
    0 1px 0 rgba(210, 255, 0, 0.18) inset;
}

.btn-small:active {
  transform: scale(0.95);
  box-shadow: none;
}

.btn-small-content {
  position: relative;
  display: grid;
  padding: 5px;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  box-shadow:
    inset 0 -3px 0 #d9d9d9,
    0 -3px 0 #ffffff;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  z-index: 1;
}

:global(.dark) .btn-small-content {
  box-shadow:
    inset 0 -4px 0 #1f1f1f,
    0 -4px 0 #070707;
}

.btn-small-icon {
  position: relative;
  display: flex;
  transform: translate3d(0, -2px, 0);
  grid-column: 4;
  align-self: start;
  justify-self: end;
  width: 10px;
  height: 10px;
  transition: 0.3s ease-in-out;
}

.btn-small:hover .btn-small-icon {
  transform: translateY(-8px);
}

.btn-small-icon svg {
  width: 10px;
  height: 10px;
  fill: #1f1f1f;
}

:global(.dark) .btn-small-icon svg {
  fill: #d2ff00;
}

.btn-small-text {
  position: relative;
  transform: translate3d(0, -2px, 0);
  margin: 0;
  align-self: end;
  grid-column: 1 / 5;
  grid-row: 2;
  text-align: center;
  font-size: 8px;
  font-weight: 600;
  background-color: #1f1f1f;
  color: transparent;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
  -webkit-background-clip: text;
  background-clip: text;
  transition: 0.3s ease-in-out;
}

:global(.dark) .btn-small-text {
  background-color: #d2ff00;
  text-shadow: none;
}

.btn-small:hover .btn-small-text {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .btn-small {
    width: 46px;
    height: 46px;
    right: 0.8rem;
    bottom: 0.8rem;
  }

  .btn-small-text {
    font-size: 7px;
  }
}
</style>

<script setup lang="ts">
import { computed, onUnmounted, watchEffect } from "vue";
import { useRoute } from "vitepress";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";

type DocsItem = {
  key: keyof typeof en.docsNav;
  href: string;
};

const docsItems: DocsItem[] = [
  { key: "docsHome", href: "/docs/" },
  { key: "quickstart", href: "/docs/quickstart" },
  { key: "cliReference", href: "/docs/cli-reference" },
  { key: "contractSchema", href: "/docs/contract-schema" },
  { key: "generators", href: "/docs/generators" },
  { key: "examples", href: "/docs/examples" },
  { key: "contributing", href: "/docs/contributing" },
  { key: "faq", href: "/docs/faq" },
];

const route = useRoute();
const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };

const t = computed(() => dict[lang.value as Lang]);
const isDocsRoute = computed(() => route.path.startsWith("/docs/"));

const activeIndex = computed(() =>
  docsItems.findIndex((item) => isActive(item.href)),
);

const isActive = (href: string) => {
  if (href === "/docs/") {
    return route.path === "/docs/";
  }
  return route.path.startsWith(href);
};

watchEffect(() => {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.classList.toggle(
    "has-docs-sidebar",
    isDocsRoute.value,
  );
});

onUnmounted(() => {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.classList.remove("has-docs-sidebar");
});
</script>

<template>
  <aside v-if="isDocsRoute" class="docs-sidebar hidden lg:block">
    <nav
      class="sticky top-24 border border-black/15 bg-white/70 p-3 font-body shadow-[0_10px_26px_-18px_rgba(7,7,7,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-[#1f1f1f]/85 dark:shadow-[0_12px_28px_-18px_rgba(0,0,0,0.7)]"
    >
      <div class="relative">
        <div
          v-if="activeIndex >= 0"
          class="pointer-events-none absolute left-0 right-0 z-[1] border border-black/10 bg-[#d2ff00]/18 transition-transform duration-300 ease-out dark:border-white/10 dark:bg-white/10"
          :style="{
            height: '2.5rem',
            transform: `translateY(${activeIndex * 2.75}rem)`,
          }"
        >
          <span
            class="absolute bottom-1 left-1 top-1 w-[3px] bg-[color:var(--vp-c-brand-1)]"
            aria-hidden="true"
          />
        </div>
        <a
          v-for="item in docsItems"
          :key="item.href"
          :href="item.href"
          class="relative z-[2] mb-1 block h-10 px-3 py-2 text-sm font-normal tracking-normal transition last:mb-0"
          :class="
            isActive(item.href)
              ? 'font-semibold text-[#070707] dark:text-accent'
              : 'text-[#1f1f1f] hover:bg-[#d2ff00]/26 hover:text-[#070707] dark:text-white/80 dark:hover:bg-white/6 dark:hover:text-accent'
          "
        >
          {{ t.docsNav[item.key] }}
        </a>
      </div>
    </nav>
  </aside>
</template>

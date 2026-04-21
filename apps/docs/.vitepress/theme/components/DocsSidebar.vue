<script setup lang="ts">
import { computed, onUnmounted, watchEffect } from "vue";
import { useRoute } from "vitepress";
import en from "../../../i18n/en.json";
import es from "../../../i18n/es.json";
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
  { key: "versioning", href: "/docs/versioning" },
  { key: "examples", href: "/docs/examples" },
  { key: "contributing", href: "/docs/contributing" },
  { key: "faq", href: "/docs/faq" }
];

const route = useRoute();
const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };

const t = computed(() => dict[lang.value as Lang]);
const isDocsRoute = computed(() => route.path.startsWith("/docs/"));

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
  document.documentElement.classList.toggle("has-docs-sidebar", isDocsRoute.value);
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
    <nav class="sticky top-24 space-y-2 rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-3">
      <a
        v-for="item in docsItems"
        :key="item.href"
        :href="item.href"
        class="block rounded-lg px-3 py-2 text-sm transition"
        :class="
          isActive(item.href)
            ? 'bg-black/10 text-[color:var(--vp-c-text-1)] dark:bg-white/10'
            : 'text-[color:var(--vp-c-text-2)] hover:bg-black/5 hover:text-[color:var(--vp-c-text-1)] dark:hover:bg-white/5'
        "
      >
        {{ t.docsNav[item.key] }}
      </a>
    </nav>
  </aside>
</template>

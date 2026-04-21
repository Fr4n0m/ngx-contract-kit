<script setup lang="ts">
import { computed } from "vue";
import en from "../../../i18n/en.json";
import es from "../../../i18n/es.json";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang]);
</script>

<template>
  <nav class="ml-auto hidden items-center gap-5 pr-1 md:flex">
    <a
      class="whitespace-nowrap text-sm text-[color:var(--vp-c-text-1)] hover:text-brand-700 dark:hover:text-accent"
      href="/"
      >{{ t.nav.overview }}</a
    >
    <a
      class="whitespace-nowrap text-sm text-[color:var(--vp-c-text-1)] hover:text-brand-700 dark:hover:text-accent"
      href="/#what-you-get"
      >{{ t.nav.whatYouGet }}</a
    >
    <a
      class="whitespace-nowrap text-sm text-[color:var(--vp-c-text-1)] hover:text-brand-700 dark:hover:text-accent"
      href="/docs/"
      >{{ t.nav.docs }}</a
    >
    <a
      class="whitespace-nowrap text-sm text-[color:var(--vp-c-text-1)] hover:text-brand-700 dark:hover:text-accent"
      href="/#how-it-works"
      >{{ t.nav.howItWorks }}</a
    >
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang]);
</script>

<template>
  <nav class="hidden w-full flex-nowrap items-center justify-end gap-5 pr-0 md:flex">
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


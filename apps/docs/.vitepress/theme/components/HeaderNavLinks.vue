<script setup lang="ts">
import { computed } from "vue";
import en from "../../../i18n/en.json";
import es from "../../../i18n/es.json";
import { useLang } from "../composables/lang";

const { lang } = useLang();
const t = computed(() => (lang.value === "es" ? es : en));
</script>

<template>
  <nav class="ml-auto hidden w-full items-center justify-end gap-5 pr-3 md:flex">
    <a
      class="text-sm text-slate-700 hover:text-brand-700 dark:text-brand-200 dark:hover:text-accent"
      href="/"
      >{{ t.nav.overview }}</a
    >
    <a
      class="text-sm text-slate-700 hover:text-brand-700 dark:text-brand-200 dark:hover:text-accent"
      href="/#what-you-get"
      >{{ t.nav.whatYouGet }}</a
    >
    <a
      class="text-sm text-slate-700 hover:text-brand-700 dark:text-brand-200 dark:hover:text-accent"
      href="/#how-it-works"
      >{{ t.nav.howItWorks }}</a
    >
  </nav>
</template>

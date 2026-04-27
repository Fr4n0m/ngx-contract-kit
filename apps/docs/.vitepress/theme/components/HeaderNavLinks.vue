<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang]);
</script>

<template>
  <nav
    class="hidden w-full flex-nowrap items-center justify-end gap-5 pr-0 md:flex"
  >
    <a
      class="whitespace-nowrap px-2 py-1 text-sm text-[color:var(--vp-c-text-1)] transition hover:bg-[#d2ff00] hover:text-[#1f1f1f] focus-visible:bg-[#d2ff00] focus-visible:text-[#1f1f1f]"
      href="/"
      >{{ t.nav.overview }}</a
    >
    <a
      class="whitespace-nowrap px-2 py-1 text-sm text-[color:var(--vp-c-text-1)] transition hover:bg-[#d2ff00] hover:text-[#1f1f1f] focus-visible:bg-[#d2ff00] focus-visible:text-[#1f1f1f]"
      href="/#what-you-get"
      >{{ t.nav.whatYouGet }}</a
    >
    <a
      class="whitespace-nowrap px-2 py-1 text-sm text-[color:var(--vp-c-text-1)] transition hover:bg-[#d2ff00] hover:text-[#1f1f1f] focus-visible:bg-[#d2ff00] focus-visible:text-[#1f1f1f]"
      href="/docs/"
      >{{ t.nav.docs }}</a
    >
    <a
      class="whitespace-nowrap px-2 py-1 text-sm text-[color:var(--vp-c-text-1)] transition hover:bg-[#d2ff00] hover:text-[#1f1f1f] focus-visible:bg-[#d2ff00] focus-visible:text-[#1f1f1f]"
      href="/#how-it-works"
      >{{ t.nav.howItWorks }}</a
    >
  </nav>
</template>

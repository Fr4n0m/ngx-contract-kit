<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vitepress";
import { en, es } from "../../../i18n";
import AppFooter from "./AppFooter.vue";
import { useLang, type Lang } from "../composables/lang";

const dict: Record<Lang, typeof en> = { en, es };
const { lang } = useLang();
const route = useRoute();
const t = computed(() => dict[lang.value as Lang]);
const isHome = computed(() => route.path === "/" || route.path === "/index.md");
</script>

<template>
  <div
    class="max-w-none px-[clamp(1rem,4vw,4rem)] pb-6"
    :class="isHome
      ? 'mx-[calc(50%-50vw)] w-screen -mt-20 sm:-mt-16'
      : 'mx-auto w-full mt-8'"
  >
    <AppFooter :footer="t.footer" />
  </div>
</template>


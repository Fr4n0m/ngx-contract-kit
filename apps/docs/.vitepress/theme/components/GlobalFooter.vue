<script setup lang="ts">
import { computed } from "vue";
import en from "../../../i18n/en.json";
import es from "../../../i18n/es.json";
import AppFooter from "./AppFooter.vue";
import { useLang, type Lang } from "../composables/lang";

const dict: Record<Lang, typeof en> = { en, es };
const { lang } = useLang();
const t = computed(() => dict[lang.value as Lang]);
</script>

<template>
  <div class="mx-auto w-full max-w-none px-[clamp(1rem,4vw,4rem)] pb-6">
    <AppFooter :footer="t.footer" />
  </div>
</template>

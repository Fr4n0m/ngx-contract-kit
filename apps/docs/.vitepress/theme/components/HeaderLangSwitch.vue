<script setup lang="ts">
import { useLang } from "../composables/lang";

const { lang, setLang } = useLang();
</script>

<template>
  <div class="ml-3 flex items-center gap-1 rounded-md border border-brand-200 bg-white/80 p-1 dark:border-brand-700/50 dark:bg-[#10211b]/80">
    <button
      type="button"
      class="rounded px-2 py-1 text-xs font-semibold transition"
      :class="lang === 'en' ? 'bg-brand-700 text-white dark:bg-accent dark:text-[#1f2319]' : 'text-slate-600 dark:text-brand-100'"
      @click="setLang('en')"
    >
      EN
    </button>
    <button
      type="button"
      class="rounded px-2 py-1 text-xs font-semibold transition"
      :class="lang === 'es' ? 'bg-brand-700 text-white dark:bg-accent dark:text-[#1f2319]' : 'text-slate-600 dark:text-brand-100'"
      @click="setLang('es')"
    >
      ES
    </button>
  </div>
</template>

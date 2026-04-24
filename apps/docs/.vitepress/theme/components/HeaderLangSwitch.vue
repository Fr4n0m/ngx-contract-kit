<script setup lang="ts">
import { useLang } from "../composables/lang";

const { lang, setLang } = useLang();
</script>

<template>
  <div class="ml-3 flex items-center gap-1 rounded-md border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-1">
    <button
      type="button"
      class="rounded px-2 py-1 text-xs font-semibold transition"
      :class="lang === 'en' ? 'bg-accent text-[#1f2319]' : 'text-[color:var(--vp-c-text-2)]'"
      @click="setLang('en')"
    >
      EN
    </button>
    <button
      type="button"
      class="rounded px-2 py-1 text-xs font-semibold transition"
      :class="lang === 'es' ? 'bg-accent text-[#1f2319]' : 'text-[color:var(--vp-c-text-2)]'"
      @click="setLang('es')"
    >
      ES
    </button>
  </div>
</template>

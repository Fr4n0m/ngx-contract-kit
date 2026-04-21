<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  kicker: string;
  iconSize: number;
}>();
</script>

<template>
  <div class="mb-3 inline-flex items-center gap-2 rounded-md border border-black/15 bg-black/18 px-2.5 py-1 leading-none text-[color:var(--vp-c-text-2)] dark:border-white/10 dark:bg-white/5 dark:text-[#d2ff00]">
    <component :is="icon" :size="iconSize" />
    <p class="font-heading text-[17px] font-semibold uppercase tracking-wider leading-none">{{ kicker }}</p>
  </div>
</template>

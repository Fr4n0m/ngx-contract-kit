<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  kicker: string;
  iconSize: number;
}>();
</script>

<template>
  <div class="mb-3 inline-flex max-w-full items-center gap-1.5 rounded-md border border-black/15 bg-black/18 px-2 py-1 leading-none text-[color:var(--vp-c-text-2)] dark:border-white/10 dark:bg-white/5 dark:text-[#d2ff00] sm:gap-2 sm:px-2.5">
    <component :is="icon" :size="iconSize" />
    <p class="truncate font-heading text-[14px] font-semibold uppercase tracking-wide leading-none sm:text-[17px] sm:tracking-wider">{{ kicker }}</p>
  </div>
</template>

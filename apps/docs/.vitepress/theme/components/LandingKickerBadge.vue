<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  kicker: string;
  iconSize: number;
}>();
</script>

<template>
  <div
    class="mb-3 inline-flex max-w-full items-center gap-1.5 border border-black/12 bg-white/35 px-2 py-0 leading-none dark:border-white/12 dark:bg-white/5 sm:gap-2 sm:px-2.5"
  >
    <component
      :is="icon"
      :size="iconSize"
      class="text-[color:var(--vp-c-text-1)] dark:text-accent"
    />
    <p
      class="truncate font-heading text-[12px] font-semibold uppercase tracking-wide leading-none text-[color:var(--vp-c-text-1)] dark:text-accent sm:text-[14px] sm:tracking-wider"
    >
      {{ kicker }}
    </p>
  </div>
</template>

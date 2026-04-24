<script setup lang="ts">
import type { Component } from "vue";
import LandingKickerBadge from "./LandingKickerBadge.vue";

defineProps<{
  icon: Component;
  kicker: string;
  copy: string;
  iconSize: number;
}>();
</script>

<template>
  <article class="min-w-0 rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card sm:p-5">
    <LandingKickerBadge :icon="icon" :kicker="kicker" :icon-size="iconSize" />
    <p class="mt-2 break-words text-[color:var(--vp-c-text-2)]">{{ copy }}</p>
  </article>
</template>

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
  <article class="rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-5 shadow-card">
    <LandingKickerBadge :icon="icon" :kicker="kicker" :icon-size="iconSize" />
    <p class="mt-2 text-[color:var(--vp-c-text-2)]">{{ copy }}</p>
  </article>
</template>

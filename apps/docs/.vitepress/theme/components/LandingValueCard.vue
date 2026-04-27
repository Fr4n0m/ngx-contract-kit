<script setup lang="ts">
import type { Component } from "vue";
import LandingKickerBadge from "./LandingKickerBadge.vue";
import { useReveal } from "../composables/useReveal";

const props = defineProps<{
  icon: Component;
  kicker: string;
  title: string;
  copy: string;
  iconSize: number;
  revealDelay?: number;
}>();

const el = useReveal(props.revealDelay ?? 0);
</script>

<template>
  <article
    ref="el"
    class="reveal landing-card relative min-w-0 overflow-hidden border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card ring-1 ring-transparent transition hover:border-accent/30 hover:ring-accent/25 sm:p-5"
  >
    <span
      class="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 bg-accent/90"
    />
    <LandingKickerBadge :icon="icon" :kicker="kicker" :icon-size="iconSize" />
    <h3
      class="mt-2 break-words font-heading text-lg text-[color:var(--vp-c-text-1)]"
    >
      {{ title }}
    </h3>
    <span class="mt-1 block h-0.5 w-14 bg-accent/80" />
    <p class="mt-2 break-words text-[color:var(--vp-c-text-2)]">{{ copy }}</p>
  </article>
</template>

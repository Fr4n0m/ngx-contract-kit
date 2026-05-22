<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vitepress";
import SubscriptionBanner from "./SubscriptionBanner.vue";

const route = useRoute();
const isHome = computed(() => route.path === "/" || route.path === "/index.md");
</script>

<template>
  <SubscriptionBanner v-if="!isHome" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vitepress";
import SubscriptionBanner from "./SubscriptionBanner.vue";

const route = useRoute();
const isHome = computed(() => route.path === "/" || route.path === "/index.md");
</script>

<template>
  <div
    v-if="!isHome"
    class="mx-[calc(50%-50vw)] w-screen px-[clamp(1rem,4vw,4rem)]"
  >
    <SubscriptionBanner />
  </div>
</template>

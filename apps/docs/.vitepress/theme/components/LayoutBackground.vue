<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { page } = useData();
const isHome = computed(() => page.value.relativePath === "index.md");
</script>

<template>
  <div v-if="isHome" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,rgba(86,104,78,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(86,104,78,0.14)_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,rgba(182,221,0,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(182,221,0,0.08)_1px,transparent_1px)]"
    />
    <div
      class="absolute left-1/2 top-[-28%] h-[880px] w-screen -translate-x-1/2 bg-[radial-gradient(circle_360px_at_50%_300px,rgba(182,221,0,0.16),rgba(183,193,178,0))] dark:bg-[radial-gradient(circle_360px_at_50%_300px,rgba(210,255,0,0.14),rgba(17,24,15,0))]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";
import InstallCommandSelector from "./InstallCommandSelector.vue";
import type { PackageManager } from "./InstallCommandSelector.vue";
import TerminalCommandList from "./TerminalCommandList.vue";
import { ref } from "vue";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].quickstart);
const manager = ref<PackageManager>("pnpm");

const runCommands = computed(() => {
  const map: Record<
    PackageManager,
    { initialize: string; generate: string; check: string }
  > = {
    pnpm: {
      initialize: "pnpm exec contract-kit init",
      generate: "pnpm exec contract-kit generate",
      check: "pnpm exec contract-kit check"
    },
    npm: {
      initialize: "npx contract-kit init",
      generate: "npx contract-kit generate",
      check: "npx contract-kit check"
    },
    yarn: {
      initialize: "yarn contract-kit init",
      generate: "yarn contract-kit generate",
      check: "yarn contract-kit check"
    },
    bun: {
      initialize: "bunx contract-kit init",
      generate: "bunx contract-kit generate",
      check: "bunx contract-kit check"
    }
  };

  return map[manager.value];
});
</script>

<template>
  <section class="space-y-8">
    <div class="space-y-3">
      <h1 class="font-heading text-3xl text-[color:var(--vp-c-text-1)]">
        {{ t.title }}
      </h1>
      <p class="max-w-3xl text-[color:var(--vp-c-text-2)]">
        {{ t.subtitle }}
      </p>
    </div>

    <section
      class="space-y-3 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
    >
      <h2 class="font-heading text-xl text-[color:var(--vp-c-text-1)]">
        {{ t.prerequisitesTitle }}
      </h2>
      <ul class="space-y-1 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.prerequisites" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        1. {{ t.steps.install.title }}
      </h2>
      <p class="text-[color:var(--vp-c-text-2)]">{{ t.steps.install.description }}</p>
      <InstallCommandSelector v-model="manager" />
      <div
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ t.steps.install.resultTitle }}
        </p>
        <ul class="mt-2 space-y-1 text-sm text-[color:var(--vp-c-text-2)]">
          <li v-for="item in t.steps.install.results" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        2. {{ t.steps.initialize.title }}
      </h2>
      <p class="text-[color:var(--vp-c-text-2)]">
        {{ t.steps.initialize.description }}
      </p>
      <TerminalCommandList :commands="[runCommands.initialize]" />
      <div
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ t.steps.initialize.resultTitle }}
        </p>
        <ul class="mt-2 space-y-1 text-sm text-[color:var(--vp-c-text-2)]">
          <li v-for="item in t.steps.initialize.results" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        3. {{ t.steps.generate.title }}
      </h2>
      <p class="text-[color:var(--vp-c-text-2)]">{{ t.steps.generate.description }}</p>
      <TerminalCommandList :commands="[runCommands.generate]" />
      <div
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ t.steps.generate.resultTitle }}
        </p>
        <ul class="mt-2 space-y-1 text-sm text-[color:var(--vp-c-text-2)]">
          <li v-for="item in t.steps.generate.results" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        4. {{ t.steps.compatibility.title }}
      </h2>
      <p class="text-[color:var(--vp-c-text-2)]">
        {{ t.steps.compatibility.description }}
      </p>
      <TerminalCommandList :commands="[runCommands.check]" />
      <div
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ t.steps.compatibility.resultTitle }}
        </p>
        <ul class="mt-2 space-y-1 text-sm text-[color:var(--vp-c-text-2)]">
          <li v-for="item in t.steps.compatibility.results" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section
      class="space-y-2 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
    >
      <h2 class="font-heading text-xl text-[color:var(--vp-c-text-1)]">
        {{ t.nextTitle }}
      </h2>
      <p class="text-[color:var(--vp-c-text-2)]">
        {{ t.nextDescription }}
      </p>
    </section>
  </section>
</template>


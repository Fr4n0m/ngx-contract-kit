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
      initialize: "pnpm ckit:init",
      generate: "pnpm ckit:generate",
      check: "pnpm ckit:check"
    },
    npm: {
      initialize: "npm run ckit:init",
      generate: "npm run ckit:generate",
      check: "npm run ckit:check"
    },
    yarn: {
      initialize: "yarn ckit:init",
      generate: "yarn ckit:generate",
      check: "yarn ckit:check"
    },
    bun: {
      initialize: "bun run ckit:init",
      generate: "bun run ckit:generate",
      check: "bun run ckit:check"
    }
  };

  return map[manager.value];
});
</script>

<template>
  <section class="space-y-8">
    <h1 class="font-heading text-3xl text-[color:var(--vp-c-text-1)]">
      {{ t.title }}
    </h1>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        1. {{ t.steps.install }}
      </h2>
      <InstallCommandSelector v-model="manager" />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        2. {{ t.steps.initialize }}
      </h2>
      <TerminalCommandList :commands="[runCommands.initialize]" />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        3. {{ t.steps.generate }}
      </h2>
      <TerminalCommandList :commands="[runCommands.generate]" />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        4. {{ t.steps.compatibility }}
      </h2>
      <TerminalCommandList :commands="[runCommands.check]" />
    </section>
  </section>
</template>


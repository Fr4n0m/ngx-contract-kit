<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../../i18n";
import { useLang, type Lang } from "../../composables/lang";
import TerminalCommandList from "../TerminalCommandList.vue";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].examples);
</script>

<template>
  <section class="space-y-8">
    <div class="space-y-3">
      <h1 class="font-heading text-3xl text-[color:var(--vp-c-text-1)]">
        {{ t.title }}
      </h1>
      <p class="max-w-3xl text-[color:var(--vp-c-text-2)]">
        {{ t.intro }}
      </p>
    </div>

    <section class="grid gap-4 lg:grid-cols-2">
      <article
        v-for="scenario in t.scenarios"
        :key="scenario.title"
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <h3
          class="!m-0 !border-0 !pt-0 font-heading text-xl text-[color:var(--vp-c-text-1)]"
        >
          {{ scenario.title }}
        </h3>
        <p class="mt-2 text-[color:var(--vp-c-text-2)]">
          {{ scenario.goal }}
        </p>
        <p class="mt-2 text-sm text-[color:var(--vp-c-text-3)]">
          {{ scenario.context }}
        </p>
        <ul class="mt-3 space-y-2 text-[color:var(--vp-c-text-2)]">
          <li v-for="step in scenario.steps" :key="step">{{ step }}</li>
        </ul>
        <p class="mt-3 text-sm font-semibold text-[color:var(--vp-c-text-1)]">
          {{ t.expectedTitle }}
        </p>
        <ul class="mt-1 space-y-1 text-sm text-[color:var(--vp-c-text-2)]">
          <li v-for="item in scenario.expected" :key="item">{{ item }}</li>
        </ul>
        <div class="mt-3">
          <TerminalCommandList :commands="scenario.commands" />
        </div>
      </article>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.commonPitfallsTitle }}
      </h2>
      <ul class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.commonPitfalls" :key="item">{{ item }}</li>
      </ul>
    </section>
  </section>
</template>

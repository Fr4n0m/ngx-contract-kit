<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../../i18n";
import { useLang, type Lang } from "../../composables/lang";
import TerminalCommandList from "../TerminalCommandList.vue";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].generators);
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

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.artifactsTitle }}
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="artifact in t.artifacts"
          :key="artifact.file"
          class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
        >
          <h3 class="font-heading text-lg text-[color:var(--vp-c-text-1)]">
            {{ artifact.name }}
          </h3>
          <p class="mt-2 text-[color:var(--vp-c-text-2)]">
            {{ artifact.purpose }}
          </p>
          <p class="mt-2 text-sm text-[color:var(--vp-c-text-3)]">
            {{ artifact.whenToUse }}
          </p>
          <ul class="mt-2 space-y-1 text-sm text-[color:var(--vp-c-text-2)]">
            <li v-for="item in artifact.outputs" :key="item">{{ item }}</li>
          </ul>
          <p class="mt-2 text-xs text-[color:var(--vp-c-text-3)]">
            {{ artifact.file }}
          </p>
        </article>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.flowTitle }}
      </h2>
      <ol class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.flowItems" :key="item">{{ item }}</li>
      </ol>
      <TerminalCommandList :commands="[t.command]" />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.readinessTitle }}
      </h2>
      <ul class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.readinessItems" :key="item">{{ item }}</li>
      </ul>
    </section>
  </section>
</template>

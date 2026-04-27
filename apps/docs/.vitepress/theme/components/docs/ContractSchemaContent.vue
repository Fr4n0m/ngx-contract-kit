<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../../i18n";
import { useLang, type Lang } from "../../composables/lang";
import TerminalCodeBlock from "../TerminalCodeBlock.vue";
import TerminalCommandList from "../TerminalCommandList.vue";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].contractSchema);
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

    <section
      class="space-y-3 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
    >
      <h3
        class="!m-0 !border-0 !pt-0 font-heading text-2xl text-[color:var(--vp-c-text-1)]"
      >
        {{ t.mentalModelTitle }}
      </h3>
      <p class="text-[color:var(--vp-c-text-2)]">{{ t.mentalModel }}</p>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      <article
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <h3
          class="!m-0 !border-0 !pt-0 font-heading text-xl text-[color:var(--vp-c-text-1)]"
        >
          {{ t.requiredTitle }}
        </h3>
        <ul class="mt-3 space-y-2 text-[color:var(--vp-c-text-2)]">
          <li v-for="item in t.requiredItems" :key="item">{{ item }}</li>
        </ul>
      </article>
      <article
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <h3
          class="!m-0 !border-0 !pt-0 font-heading text-xl text-[color:var(--vp-c-text-1)]"
        >
          {{ t.endpointTitle }}
        </h3>
        <ul class="mt-3 space-y-2 text-[color:var(--vp-c-text-2)]">
          <li v-for="item in t.endpointItems" :key="item">{{ item }}</li>
        </ul>
      </article>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.fieldGuideTitle }}
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="field in t.fieldGuide"
          :key="field.name"
          class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
        >
          <h3 class="font-heading text-lg text-[color:var(--vp-c-text-1)]">
            {{ field.name }}
          </h3>
          <p class="mt-2 text-[color:var(--vp-c-text-2)]">
            {{ field.meaning }}
          </p>
          <p class="mt-2 text-sm text-[color:var(--vp-c-text-3)]">
            {{ field.example }}
          </p>
        </article>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.sampleTitle }}
      </h2>
      <TerminalCodeBlock :file-label="t.sampleFile" :code="t.sampleCode" />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.noteTitle }}
      </h2>
      <ul class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.notes" :key="item">{{ item }}</li>
      </ul>
      <TerminalCommandList :commands="['contract-kit validate']" compact />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.commonMistakesTitle }}
      </h2>
      <ul class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.commonMistakes" :key="item">{{ item }}</li>
      </ul>
    </section>
  </section>
</template>

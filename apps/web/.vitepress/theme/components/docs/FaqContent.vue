<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../../i18n";
import { useLang, type Lang } from "../../composables/lang";
import TerminalCommandList from "../TerminalCommandList.vue";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].faq);
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
      <article
        v-for="item in t.items"
        :key="item.question"
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <h3
          class="!m-0 !border-0 !pt-0 font-heading text-xl text-[color:var(--vp-c-text-1)]"
        >
          {{ item.question }}
        </h3>
        <p class="mt-2 text-[color:var(--vp-c-text-2)]">
          {{ item.answer }}
        </p>
      </article>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.commandTitle }}
      </h2>
      <TerminalCommandList :commands="t.commands" />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.troubleshootingTitle }}
      </h2>
      <ul class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.troubleshootingItems" :key="item">{{ item }}</li>
      </ul>
    </section>
  </section>
</template>

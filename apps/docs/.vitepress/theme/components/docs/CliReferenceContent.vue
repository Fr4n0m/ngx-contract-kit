<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../../i18n";
import { useLang, type Lang } from "../../composables/lang";
import TerminalCommandList from "../TerminalCommandList.vue";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].cliReference);
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

    <section class="grid gap-4">
      <article
        v-for="item in t.commands"
        :key="item.name"
        class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
      >
        <h3
          class="!m-0 !border-0 !pt-0 font-heading text-xl text-[color:var(--vp-c-text-1)]"
        >
          {{ item.name }}
        </h3>
        <p class="mt-2 text-[color:var(--vp-c-text-2)]">
          {{ item.description }}
        </p>
        <p class="mt-2 text-sm text-[color:var(--vp-c-text-3)]">
          {{ item.whenToUse }}
        </p>
        <ul class="mt-2 space-y-1 text-sm text-[color:var(--vp-c-text-2)]">
          <li v-for="result in item.outputs" :key="result">{{ result }}</li>
        </ul>
        <div class="mt-3">
          <TerminalCommandList :commands="[item.command]" compact />
        </div>
      </article>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.executionFlowTitle }}
      </h2>
      <ol class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.executionFlow" :key="item">{{ item }}</li>
      </ol>
      <TerminalCommandList :commands="t.executionFlowCommands" />
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.tipsTitle }}
      </h2>
      <ul class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="tip in t.tips" :key="tip">{{ tip }}</li>
      </ul>
    </section>
  </section>
</template>

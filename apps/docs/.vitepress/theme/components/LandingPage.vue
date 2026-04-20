<script setup lang="ts">
import { computed } from "vue";
import en from "../../../i18n/en.json";
import es from "../../../i18n/es.json";
import AppFooter from "./AppFooter.vue";
import { useLang } from "../composables/lang";

const dict = { en, es };
const { lang } = useLang();

const t = computed(() => dict[lang.value]);
</script>

<template>
  <section class="w-full pb-16 pt-8">
    <header class="mb-10 rounded-3xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-8 shadow-card">
      <p class="font-heading text-sm uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">{{ t.hero.name }}</p>
      <h1 class="mt-3 font-heading text-3xl leading-tight text-[color:var(--vp-c-text-1)] md:text-5xl">{{ t.hero.title }}</h1>
      <p class="mt-4 max-w-3xl text-base text-[color:var(--vp-c-text-2)] md:text-lg">{{ t.hero.tagline }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a
          v-for="action in t.hero.actions"
          :key="action.href"
          class="VPButton"
          :class="action.theme === 'brand' ? 'brand' : 'alt'"
          :href="action.href"
        >
          {{ action.label }}
        </a>
      </div>
    </header>

    <div class="grid gap-5 lg:grid-cols-3">
      <article
        v-for="card in t.cards"
        :key="card.title"
        class="rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-5 shadow-card"
      >
        <p class="font-heading text-xs uppercase tracking-wider text-brand-700">{{ card.kicker }}</p>
        <h3 class="mt-2 font-heading text-xl text-[color:var(--vp-c-text-1)]">{{ card.title }}</h3>
        <p class="mt-2 text-[color:var(--vp-c-text-2)]">{{ card.copy }}</p>
      </article>
    </div>

    <section id="what-you-get" class="mt-12">
      <h2 class="mb-4 font-heading text-2xl text-[color:var(--vp-c-text-1)] md:text-3xl">{{ t.whatYouGet.title }}</h2>
      <div class="grid gap-5 lg:grid-cols-3">
        <article
          v-for="item in t.whatYouGet.items"
          :key="item.kicker"
          class="rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-5 shadow-card"
        >
          <p class="font-heading text-xs uppercase tracking-wider text-brand-700">{{ item.kicker }}</p>
          <p class="mt-2 text-[color:var(--vp-c-text-2)]">{{ item.copy }}</p>
        </article>
      </div>
    </section>

    <section id="how-it-works" class="mt-12">
      <h2 class="mb-4 font-heading text-2xl text-[color:var(--vp-c-text-1)] md:text-3xl">{{ t.howItWorks.title }}</h2>
      <ol class="list-decimal space-y-2 pl-6 text-[color:var(--vp-c-text-2)]">
        <li v-for="step in t.howItWorks.steps" :key="step">{{ step }}</li>
      </ol>
      <pre class="language-bash"><code>{{ t.howItWorks.commands.join('\n') }}</code></pre>
    </section>

    <AppFooter :footer="t.footer" />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IconAlertTriangle,
  IconBulb,
  IconCodeCircle2,
  IconRoute2,
  IconRocket
} from "@tabler/icons-vue";
import en from "../../../i18n/en.json";
import es from "../../../i18n/es.json";
import LandingFeatureCard from "./LandingFeatureCard.vue";
import LandingValueCard from "./LandingValueCard.vue";
import { useLang, type Lang } from "../composables/lang";

const dict: Record<Lang, typeof en> = { en, es };
const { lang } = useLang();

const t = computed(() => dict[lang.value as Lang]);
const cardIcons = [IconAlertTriangle, IconBulb, IconRocket] as const;
const whatYouGetIcons = [IconCodeCircle2, IconBulb, IconRoute2] as const;

const actionBaseClass =
  "inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold transition";

const actionThemeClass = {
  brand:
    "border-accent bg-accent text-[#1f2319] shadow-card hover:brightness-95",
  alt:
    "border-brand-700 bg-brand-100/75 text-brand-800 hover:bg-brand-100 dark:border-brand-500 dark:bg-brand-900/70 dark:text-brand-200 dark:hover:bg-brand-900"
} as const;
</script>

<template>
  <section class="mx-auto w-full max-w-none overflow-x-hidden pb-10 pt-8">
    <header class="mb-10 rounded-3xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-8 shadow-card">
      <p class="font-project text-sm font-semibold uppercase tracking-[0.2em] text-[#46583f] dark:text-[#b6dd00]">{{ t.hero.name }}</p>
      <h1 class="mt-3 font-heading text-3xl leading-tight text-[color:var(--vp-c-text-1)] md:text-5xl">{{ t.hero.title }}</h1>
      <p class="mt-4 max-w-5xl text-base text-[color:var(--vp-c-text-2)] md:text-lg">{{ t.hero.tagline }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a
          v-for="action in t.hero.actions"
          :key="action.href"
          :class="[actionBaseClass, actionThemeClass[action.theme as keyof typeof actionThemeClass]]"
          :href="action.href"
        >
          {{ action.label }}
        </a>
      </div>
    </header>

    <div class="grid gap-5 lg:grid-cols-3">
      <LandingFeatureCard
        v-for="(card, index) in t.cards"
        :key="card.title"
        :icon="cardIcons[index]"
        :kicker="card.kicker"
        :title="card.title"
        :copy="card.copy"
        :icon-size="28"
      />
    </div>

    <section id="what-you-get" class="mt-12">
      <h2 class="mb-4 font-heading text-2xl text-[color:var(--vp-c-text-1)] md:text-3xl">{{ t.whatYouGet.title }}</h2>
      <div class="grid gap-5 lg:grid-cols-3">
        <LandingValueCard
          v-for="(item, index) in t.whatYouGet.items"
          :key="item.kicker"
          :icon="whatYouGetIcons[index]"
          :kicker="item.kicker"
          :copy="item.copy"
          :icon-size="26"
        />
      </div>
    </section>

    <section id="how-it-works" class="mt-12">
      <h2 class="mb-4 font-heading text-2xl text-[color:var(--vp-c-text-1)] md:text-3xl">{{ t.howItWorks.title }}</h2>
      <ol class="space-y-2 pl-0 text-[color:var(--vp-c-text-2)]">
        <li
          v-for="(step, index) in t.howItWorks.steps"
          :key="step"
          class="flex items-start gap-2"
        >
          <span class="mt-[1px] inline-block min-w-[1.25rem] font-heading text-[color:var(--vp-c-text-1)]">
            {{ index + 1 }}.
          </span>
          <span>{{ step }}</span>
        </li>
      </ol>
      <pre class="language-bash"><code>{{ t.howItWorks.commands.join('\n') }}</code></pre>
    </section>
  </section>
</template>

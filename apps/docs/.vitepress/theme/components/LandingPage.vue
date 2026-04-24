<script setup lang="ts">
import { computed } from "vue";
import {
  IconAlertTriangle,
  IconBulb,
  IconCodeCircle2,
  IconRoute2,
  IconRocket,
} from "@tabler/icons-vue";
import { en, es } from "../../../i18n";
import LandingFeatureCard from "./LandingFeatureCard.vue";
import TerminalCodeBlock from "./TerminalCodeBlock.vue";
import TerminalCommandList from "./TerminalCommandList.vue";
import LandingValueCard from "./LandingValueCard.vue";
import { useLang, type Lang } from "../composables/lang";

const dict: Record<Lang, typeof en> = { en, es };
const { lang } = useLang();

const t = computed(() => dict[lang.value as Lang]);
const cardIcons = [IconAlertTriangle, IconBulb, IconRocket] as const;
const whatYouGetIcons = [IconCodeCircle2, IconBulb, IconRoute2] as const;
const howItWorksIcons = [
  IconCodeCircle2,
  IconBulb,
  IconRoute2,
  IconRocket,
] as const;

const actionBaseClass =
  "inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold transition";

const actionThemeClass = {
  brand:
    "border-accent bg-accent !text-[#1f2319] dark:!text-[#1f2319] shadow-card hover:brightness-95",
  alt: "border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] text-[color:var(--vp-c-text-1)] hover:border-accent hover:text-accent dark:border-[color:var(--vp-c-bg-alt)] dark:bg-[color:var(--vp-c-bg-soft)] dark:text-[color:var(--vp-c-text-1)] dark:hover:border-accent dark:hover:text-accent",
} as const;
</script>

<template>
  <section
    class="relative mx-[calc(50%-50vw)] w-screen max-w-none overflow-x-clip bg-transparent px-[clamp(1rem,4vw,4rem)] pb-4 pt-8"
  >
    <div class="relative z-10 mx-auto w-full max-w-none min-w-0">
      <header
        class="mb-8 rounded-3xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-5 shadow-card sm:mb-10 sm:p-8"
      >
        <p
          class="font-project text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--vp-c-text-3)] dark:text-accent"
        >
          {{ t.hero.name }}
        </p>
        <h1
          class="mt-3 break-words font-heading text-3xl leading-tight text-[color:var(--vp-c-text-1)] md:text-5xl"
        >
          {{ t.hero.title }}
        </h1>
        <p
          class="mt-4 max-w-5xl break-words text-base text-[color:var(--vp-c-text-2)] md:text-lg"
        >
          {{ t.hero.tagline }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a
            v-for="action in t.hero.actions"
            :key="action.href"
            :class="[
              actionBaseClass,
              actionThemeClass[action.theme as keyof typeof actionThemeClass],
            ]"
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
          :icon-size="20"
        />
      </div>

      <section id="what-you-get" class="mt-12">
        <h2
          class="mb-4 font-heading text-2xl text-[color:var(--vp-c-text-1)] md:text-3xl"
        >
          {{ t.whatYouGet.title }}
        </h2>
        <div class="grid gap-4 sm:gap-5 lg:grid-cols-3">
          <LandingValueCard
            v-for="(item, index) in t.whatYouGet.items"
            :key="item.kicker"
            :icon="whatYouGetIcons[index]"
            :kicker="item.kicker"
            :copy="item.copy"
            :icon-size="18"
          />
        </div>
      </section>

      <section id="how-it-works" class="mt-12">
        <h2
          class="mb-4 font-heading text-2xl text-[color:var(--vp-c-text-1)] md:text-3xl"
        >
          {{ t.howItWorks.title }}
        </h2>
        <p class="mb-6 max-w-4xl text-[color:var(--vp-c-text-2)]">
          {{ t.howItWorks.intro }}
        </p>

        <div class="grid gap-4 md:grid-cols-2">
          <article
            v-for="(step, index) in t.howItWorks.steps"
            :key="step.title"
            class="min-w-0 rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card sm:p-5"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="inline-flex items-center gap-2">
                <span
                  class="inline-flex size-14 items-center justify-center rounded-full bg-accent font-heading text-[30px] text-[#1f2319]"
                >
                  <component :is="howItWorksIcons[index]" :size="35" />
                </span>
              </div>
            </div>
            <h3
              class="break-words font-heading text-xl text-[color:var(--vp-c-text-1)]"
            >
              {{ step.title }}
            </h3>
            <p class="break-words text-[color:var(--vp-c-text-2)]">
              {{ step.detail }}
            </p>
            <div v-if="step.command" class="mt-4">
              <TerminalCommandList :commands="[step.command]" compact />
            </div>
          </article>
        </div>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <article
            class="min-w-0 rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card sm:p-5"
          >
            <div class="mb-2 flex items-center justify-between gap-3">
              <h3
                class="break-words font-heading text-xl text-[color:var(--vp-c-text-1)]"
              >
                {{ t.howItWorks.example.title }}
              </h3>
            </div>
            <TerminalCodeBlock
              :file-label="t.howItWorks.example.fileLabel"
              :code="t.howItWorks.example.code"
            />
          </article>

          <article
            class="min-w-0 rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card sm:p-5"
          >
            <h3
              class="break-words font-heading text-xl text-[color:var(--vp-c-text-1)]"
            >
              {{ t.howItWorks.releaseChecks.title }}
            </h3>
            <ul class="mt-3 space-y-2 text-[color:var(--vp-c-text-2)]">
              <li
                v-for="item in t.howItWorks.releaseChecks.items"
                :key="item"
                class="flex min-w-0 justify-start items-center gap-2"
              >
                <span
                  class="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span class="min-w-0 break-words">{{ item }}</span>
              </li>
            </ul>
            <div class="mt-4 border-t border-[color:var(--vp-c-bg-alt)] pt-3">
              <p
                class="mb-2 text-xs uppercase tracking-wider text-[color:var(--vp-c-text-3)]"
              >
                {{ t.howItWorks.commandsTitle }}
              </p>
              <TerminalCommandList :commands="t.howItWorks.commands" />
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

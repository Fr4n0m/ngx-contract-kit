<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../../i18n";
import { useLang, type Lang } from "../../composables/lang";

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].docsHome);
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
        {{ t.audienceTitle }}
      </h2>
      <ul class="space-y-2 text-[color:var(--vp-c-text-2)]">
        <li v-for="item in t.audienceItems" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.pathTitle }}
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <article
          v-for="step in t.pathSteps"
          :key="step.title"
          class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
        >
          <p
            class="text-xs uppercase tracking-[0.16em] text-[color:var(--vp-c-text-3)]"
          >
            {{ step.phase }}
          </p>
          <h3 class="mt-1 font-heading text-xl text-[color:var(--vp-c-text-1)]">
            {{ step.title }}
          </h3>
          <p class="mt-2 text-[color:var(--vp-c-text-2)]">
            {{ step.description }}
          </p>
          <a
            class="mt-3 inline-flex text-sm underline decoration-accent underline-offset-4"
            :href="step.href"
          >
            {{ step.cta }}
          </a>
        </article>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.packagesTitle }}
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="pkg in t.packages"
          :key="pkg.name"
          class="border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] dark:border-[#1f1f1f] dark:bg-[#070707] p-4 shadow-card"
        >
          <h3 class="font-heading text-lg text-[color:var(--vp-c-text-1)]">
            {{ pkg.name }}
          </h3>
          <p class="mt-2 text-[color:var(--vp-c-text-2)]">{{ pkg.role }}</p>
          <p class="mt-2 text-sm text-[color:var(--vp-c-text-3)]">
            {{ pkg.whenUse }}
          </p>
        </article>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="font-heading text-2xl text-[color:var(--vp-c-text-1)]">
        {{ t.sectionsTitle }}
      </h2>
      <ul class="grid gap-2 md:grid-cols-2">
        <li v-for="section in t.sections" :key="section.href">
          <a
            class="underline decoration-accent underline-offset-4"
            :href="section.href"
          >
            {{ section.label }}
          </a>
        </li>
      </ul>
    </section>

    <p class="text-sm text-[color:var(--vp-c-text-2)]">
      {{ t.helpText }}
    </p>
  </section>
</template>

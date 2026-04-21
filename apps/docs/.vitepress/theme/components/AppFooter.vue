<script setup lang="ts">
import { IconBrandGithub } from "@tabler/icons-vue";

type FooterLink = {
  label: string;
  href: string;
};

type FooterPayload = {
  eyebrow: string;
  title: string;
  description: string;
  sections: {
    product: string;
    prs: string;
  };
  productLinks: FooterLink[];
  resourceLinks: FooterLink[];
  legal: string;
  copyright: string;
};

defineProps<{
  footer: FooterPayload;
}>();
</script>

<template>
  <footer
    class="mt-10 rounded-3xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] px-6 py-8 shadow-card"
  >
    <div class="grid gap-8 md:grid-cols-12">
      <div class="md:col-span-6">
        <p
          class="font-heading text-xs uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300"
        >
          {{ footer.eyebrow }}
        </p>
        <h3 class="mt-3 font-heading text-2xl text-[color:var(--vp-c-text-1)]">
          {{ footer.title }}
        </h3>
        <p
          class="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--vp-c-text-2)]"
        >
          {{ footer.description }}
        </p>
      </div>

      <div class="md:col-span-3">
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ footer.sections.product }}
        </p>
        <ul class="mt-3 space-y-2">
          <li v-for="link in footer.productLinks" :key="link.href">
            <a
              class="text-sm text-[color:var(--vp-c-text-1)] transition hover:text-brand-700 dark:text-[color:var(--vp-c-text-2)] dark:hover:text-brand-300"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>

      <div class="md:col-span-3">
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ footer.sections.prs }}
        </p>
        <ul class="mt-3 space-y-2">
          <li v-for="link in footer.resourceLinks" :key="link.href">
            <a
              class="inline-flex items-center gap-1.5 text-sm text-[color:var(--vp-c-text-1)] transition hover:text-brand-700 dark:text-[color:var(--vp-c-text-2)] dark:hover:text-brand-300"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noreferrer"
            >
              <IconBrandGithub :size="16" />
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--vp-c-bg-alt)] pt-4"
    >
      <p
        class="text-xs uppercase tracking-wide text-[color:var(--vp-c-text-2)]"
      >
        {{ footer.legal }}
      </p>
      <p class="text-xs text-[color:var(--vp-c-text-2)]">
        {{ footer.copyright }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { IconBrandGithub, IconCoffee } from "@tabler/icons-vue";
import { useReveal } from "../composables/useReveal";

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
  signaturePrefix: string;
  signatureName: string;
  signatureUrl: string;
  legal: string;
  copyright: string;
};

defineProps<{
  footer: FooterPayload;
}>();

const el = useReveal(0);

const getResourceIcon = (href: string) =>
  href.includes("buymeacoffee.com") ? IconCoffee : IconBrandGithub;
</script>

<template>
  <footer
    ref="el"
    class="reveal mt-4 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] px-4 py-7 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707] sm:px-6 sm:py-8"
  >
    <div class="grid gap-8 md:grid-cols-12">
      <div class="md:col-span-6">
        <p
          class="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-[#1f1f1f] dark:text-accent"
        >
          {{ footer.eyebrow }}
        </p>
        <h3
          class="mt-3 break-words font-project text-2xl text-[color:var(--vp-c-text-1)]"
        >
          {{ footer.title }}
        </h3>
        <p
          class="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--vp-c-text-2)]"
        >
          {{ footer.description }}
        </p>
      </div>

      <div class="md:col-span-3">
        <ul class="space-y-2">
          <li v-for="link in footer.productLinks" :key="link.href">
            <a
              class="text-sm text-[color:var(--vp-c-text-2)] transition hover:text-ink hover:bg-accent animation-all duration-300 p-1 hover:scale-95 active:scale-90"
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
              class="inline-flex items-center gap-1.5 text-sm text-[color:var(--vp-c-text-2)] transition hover:text-ink hover:bg-accent animation-all duration-300 p-1 hover:scale-95 active:scale-90"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noreferrer"
            >
              <component :is="getResourceIcon(link.href)" :size="16" />
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mt-8 grid gap-2 border-t border-[color:var(--vp-c-bg-alt)] pt-4 text-xs text-[color:var(--vp-c-text-2)] md:grid-cols-3 md:items-center"
    >
      <p class="uppercase tracking-wide">
        {{ footer.legal }}
      </p>
      <p class="break-words md:text-center">
        {{ footer.signaturePrefix }}
        <a
          class="underline underline-offset-4 transition hover:text-ink hover:bg-accent animation-all duration-300 p-1 hover:scale-95 active:scale-90"
          :href="footer.signatureUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ footer.signatureName }}
        </a>
      </p>
      <p class="md:text-right">
        {{ footer.copyright }}
      </p>
    </div>
  </footer>
</template>

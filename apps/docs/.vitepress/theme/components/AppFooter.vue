<script setup lang="ts">
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
    resources: string;
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
  <footer class="mt-16 rounded-3xl border border-slate-300/70 bg-white/70 px-6 py-8 shadow-card dark:border-brand-700/45 dark:bg-[#10211b]/72">
    <div class="grid gap-8 md:grid-cols-12">
      <div class="md:col-span-6">
        <p class="font-heading text-xs uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">{{ footer.eyebrow }}</p>
        <h3 class="mt-3 font-heading text-2xl text-ink dark:text-brand-100">{{ footer.title }}</h3>
        <p class="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 dark:text-brand-200">{{ footer.description }}</p>
      </div>

      <div class="md:col-span-3">
        <p class="font-heading text-sm text-slate-800 dark:text-brand-100">{{ footer.sections.product }}</p>
        <ul class="mt-3 space-y-2">
          <li v-for="link in footer.productLinks" :key="link.href">
            <a class="text-sm text-slate-600 transition hover:text-brand-700 dark:text-brand-100 dark:hover:text-brand-300" :href="link.href">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>

      <div class="md:col-span-3">
        <p class="font-heading text-sm text-slate-800 dark:text-brand-100">{{ footer.sections.resources }}</p>
        <ul class="mt-3 space-y-2">
          <li v-for="link in footer.resourceLinks" :key="link.href">
            <a
              class="inline-flex items-center gap-1.5 text-sm text-slate-600 transition hover:text-brand-700 dark:text-brand-100 dark:hover:text-brand-300"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noreferrer"
            >
              <svg
                v-if="link.href.includes('github.com')"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.34-1.74-1.34-1.74-1.1-.74.08-.72.08-.72 1.21.09 1.85 1.24 1.85 1.24 1.08 1.84 2.84 1.31 3.53 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
                />
              </svg>
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-300/70 pt-4 dark:border-brand-700/40">
      <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-brand-200/80">{{ footer.legal }}</p>
      <p class="text-xs text-slate-500 dark:text-brand-200/80">{{ footer.copyright }}</p>
    </div>
  </footer>
</template>

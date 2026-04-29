<script setup lang="ts">
import { IconBrandGithub, IconBrandNpm, IconCoffee } from "@tabler/icons-vue";
import { onMounted } from "vue";
import { useReveal } from "../composables/useReveal";

const GRAVATAR_HASH = "45f9e6ff5a1ed8b109f19dc13f59c26e7d39fceb75f9344ac30ea6db18f6fbde";

onMounted(async () => {
  const [{ Hovercards }] = await Promise.all([
    import("@gravatar-com/hovercards"),
    import("@gravatar-com/hovercards/dist/style.css"),
  ]);
  const hc = new Hovercards();
  const el = document.getElementById("gravatar-avatar");
  if (el) hc.attach(el);
});

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
    projects: string;
    prs: string;
  };
  productLinks: FooterLink[];
  projectLinks: FooterLink[];
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
  href.includes("buymeacoffee.com") ? IconCoffee
  : href.includes("npmjs.com") ? IconBrandNpm
  : IconBrandGithub;
</script>

<template>
  <footer
    ref="el"
    class="reveal mt-4 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] px-4 py-7 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707] sm:px-6 sm:py-8"
  >
    <div class="grid gap-8 md:grid-cols-12">
      <div class="md:col-span-5">
        <p class="font-heading text-xs font-semibold uppercase tracking-[0.18em]">
          <span class="bg-accent text-ink px-1.5 py-0.5">{{ footer.eyebrow }}</span>
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

      <div class="md:col-span-2">
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ footer.sections.product }}
        </p>
        <ul class="mt-3 space-y-2">
          <li v-for="link in footer.productLinks" :key="link.href">
            <a
              class="inline-block text-sm text-[color:var(--vp-c-text-2)] transition hover:text-ink hover:bg-accent duration-300 p-1 hover:scale-95 active:scale-90"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noreferrer"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>

      <div class="md:col-span-2">
        <p class="font-heading text-sm text-[color:var(--vp-c-text-1)]">
          {{ footer.sections.projects }}
        </p>
        <ul class="mt-3 space-y-2">
          <li v-for="link in footer.projectLinks" :key="link.href">
            <a
              class="inline-block text-sm text-[color:var(--vp-c-text-2)] transition hover:text-ink hover:bg-accent duration-300 p-1 hover:scale-95 active:scale-90"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
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
      <p class="flex items-center justify-start gap-2 break-words md:justify-center">
        {{ footer.signaturePrefix }}
        <img
          id="gravatar-avatar"
          :src="`https://www.gravatar.com/avatar/${GRAVATAR_HASH}?s=28`"
          alt="Fr4n0m"
          width="28"
          height="28"
          class="shrink-0 cursor-pointer rounded-full ring-1 ring-[color:var(--vp-c-bg-alt)] transition hover:scale-110 active:scale-95 duration-200"
        />
        <a
          class="inline-block underline underline-offset-4 transition hover:text-ink hover:bg-accent duration-300 p-1 hover:scale-95 active:scale-90"
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

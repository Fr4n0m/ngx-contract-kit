<script setup lang="ts">
import { computed } from "vue";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";

const dict: Record<Lang, typeof en> = { en, es };
const { lang, setLang } = useLang();
const t = computed(() => dict[lang.value as Lang]);
</script>

<template>
  <div class="px-6 py-4">
    <!-- Nav links -->
    <nav>
      <ul class="space-y-1">
        <li
          v-for="link in [
            { label: t.nav.overview, href: '/' },
            { label: t.nav.whatYouGet, href: '/#what-you-get' },
            { label: t.nav.howItWorks, href: '/#how-it-works' },
            { label: t.nav.docs, href: '/docs/' },
          ]"
          :key="link.href"
        >
          <a
            class="block px-3 py-3 text-base font-medium text-[color:var(--vp-c-text-1)] transition hover:bg-accent hover:text-[#1f1f1f]"
            :href="link.href"
          >{{ link.label }}</a>
        </li>
      </ul>
    </nav>

    <!-- Divider -->
    <div class="my-5 border-t border-[color:var(--vp-c-divider)]" />

    <!-- Lang switch -->
    <div>
      <p class="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--vp-c-text-3)]">
        Language
      </p>
      <div class="flex gap-2 px-3">
        <button
          v-for="l in (['en', 'es'] as const)"
          :key="l"
          type="button"
          class="px-5 py-2 text-sm font-semibold transition"
          :class="
            lang === l
              ? 'bg-accent text-[#1f1f1f]'
              : 'border border-[color:var(--vp-c-divider)] text-[color:var(--vp-c-text-2)] hover:border-accent hover:bg-accent hover:text-[#1f1f1f]'
          "
          @click="setLang(l)"
        >
          {{ l.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useData, useRoute } from "vitepress";
import { IconSun, IconMoon } from "@tabler/icons-vue";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";

type DocsItem = { key: keyof typeof en.docsNav; href: string };
const docsItems: DocsItem[] = [
  { key: "docsHome", href: "/docs/" },
  { key: "quickstart", href: "/docs/quickstart" },
  { key: "cliReference", href: "/docs/cli-reference" },
  { key: "contractSchema", href: "/docs/contract-schema" },
  { key: "generators", href: "/docs/generators" },
  { key: "examples", href: "/docs/examples" },
  { key: "contributing", href: "/docs/contributing" },
  { key: "faq", href: "/docs/faq" },
];

const dict: Record<Lang, typeof en> = { en, es };
const { lang, setLang } = useLang();
const t = computed(() => dict[lang.value as Lang]);
const { isDark } = useData();
const route = useRoute();
const isDocsRoute = computed(() => route.path.startsWith("/docs/"));
const isActiveDoc = (href: string) =>
  href === "/docs/" ? route.path === "/docs/" : route.path.startsWith(href);

const isOpen = ref(false);

function open(): void {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
}

function close(): void {
  isOpen.value = false;
  document.body.style.overflow = "";
}

function toggle(): void {
  isOpen.value ? close() : open();
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === "Escape") close();
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <!-- Hamburger — mobile only, replaces VitePress's broken one -->
  <button
    type="button"
    :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    :aria-expanded="isOpen"
    class="mobile-hamburger ml-2 flex h-8 w-8 flex-col items-center justify-center gap-[6px] md:hidden"
    @click="toggle"
  >
    <span class="bar bar-top" :class="{ active: isOpen }" />
    <span class="bar bar-mid" :class="{ active: isOpen }" />
    <span class="bar bar-bot" :class="{ active: isOpen }" />
  </button>

  <ClientOnly>
  <Teleport to="body">
    <Transition name="menu-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9998] bg-black/50"
        @click="close"
      />
    </Transition>

    <Transition name="menu-drawer">
      <div
        v-if="isOpen"
        class="fixed inset-y-0 right-0 z-[9999] flex w-72 flex-col border-l border-[color:var(--vp-c-divider)] bg-[color:var(--vp-c-bg)]"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-[color:var(--vp-c-divider)] px-5 py-4">
          <span class="font-heading text-sm font-semibold tracking-wide">contract-kit</span>
          <button
            type="button"
            aria-label="Close menu"
            class="flex h-10 w-10 items-center justify-center text-[color:var(--vp-c-text-2)] transition hover:text-[color:var(--vp-c-text-1)]"
            @click="close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto px-3 py-4">
          <!-- Main links -->
          <ul class="space-y-0.5">
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
                class="block px-3 py-3 text-sm text-[color:var(--vp-c-text-1)] transition hover:bg-accent hover:text-[#1f1f1f]"
                :href="link.href"
                @click="close"
              >{{ link.label }}</a>
            </li>
          </ul>

          <!-- Docs sidebar — always shown so user can navigate from anywhere -->
          <div class="mt-4 border-t border-[color:var(--vp-c-divider)] pt-4">
            <p class="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--vp-c-text-3)]">
              Docs
            </p>
            <ul class="space-y-0.5">
              <li v-for="item in docsItems" :key="item.href">
                <a
                  :href="item.href"
                  class="block px-3 py-2 text-sm transition"
                  :class="
                    isActiveDoc(item.href)
                      ? 'font-semibold text-accent'
                      : 'text-[color:var(--vp-c-text-2)] hover:bg-accent hover:text-[#1f1f1f]'
                  "
                  @click="close"
                >{{ t.docsNav[item.key] }}</a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Theme toggle -->
        <div class="border-t border-[color:var(--vp-c-divider)] px-5 py-4">
          <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--vp-c-text-3)]">
            Appearance
          </p>
          <button
            type="button"
            class="flex w-full items-center justify-between px-3 py-2 text-sm text-[color:var(--vp-c-text-1)] transition hover:bg-accent hover:text-[#1f1f1f]"
            @click="isDark = !isDark"
          >
            <span>{{ isDark ? 'Dark' : 'Light' }}</span>
            <component :is="isDark ? IconMoon : IconSun" :size="18" />
          </button>
        </div>

        <!-- Lang switch -->
        <div class="border-t border-[color:var(--vp-c-divider)] px-5 py-4">
          <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--vp-c-text-3)]">
            Language
          </p>
          <div class="flex gap-2">
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
    </Transition>
  </Teleport>
  </ClientOnly>
</template>

<style scoped>
.bar {
  display: block;
  width: 20px;
  height: 1.5px;
  background-color: currentColor;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform-origin: center;
}

.bar-top.active  { transform: translateY(7.5px) rotate(45deg); }
.bar-mid.active  { opacity: 0; transform: scaleX(0); }
.bar-bot.active  { transform: translateY(-7.5px) rotate(-45deg); }

</style>

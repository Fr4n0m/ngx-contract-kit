<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLang } from "../composables/lang";

const { lang } = useLang();

const copy = {
  en: {
    confirmed: { title: "Subscription confirmed!", desc: "You'll receive an email whenever a new version of ngx-contract-kit is released.", type: "success" },
    unsubscribed: { title: "Unsubscribed", desc: "You won't receive any more release notifications.", type: "neutral" },
    error: { title: "Something went wrong", desc: "Could not complete the operation. Try again or contact us.", type: "error" },
  },
  es: {
    confirmed: { title: "¡Suscripción confirmada!", desc: "Recibirás un email cada vez que se publique una nueva versión de ngx-contract-kit.", type: "success" },
    unsubscribed: { title: "Baja completada", desc: "Ya no recibirás más notificaciones de nuevas versiones.", type: "neutral" },
    error: { title: "Algo ha ido mal", desc: "No se pudo completar la operación. Inténtalo de nuevo o contáctanos.", type: "error" },
  },
};

type State = { title: string; desc: string; type: string } | null;
const status = ref<State>(null);

onMounted(() => {
  const url = new URL(window.location.href);
  const param = url.searchParams.get("subscription");
  if (!param) return;

  const t = copy[lang.value as keyof typeof copy] ?? copy.en;
  status.value = t[param as keyof typeof t] ?? null;

  url.searchParams.delete("subscription");
  window.history.replaceState({}, "", url.toString());
});
</script>

<template>
  <div
    v-if="status"
    class="relative z-50 w-full px-[clamp(1rem,4vw,4rem)] py-4"
    :class="{
      'bg-accent/15 border-b border-accent': status.type === 'success',
      'bg-[color:var(--vp-c-bg-soft)] border-b border-[color:var(--vp-c-bg-alt)]': status.type === 'neutral',
      'bg-red-500/10 border-b border-red-500/30': status.type === 'error',
    }"
  >
    <div class="mx-auto flex max-w-none items-start justify-between gap-4">
      <div>
        <p class="font-heading font-semibold text-[color:var(--vp-c-text-1)]">{{ status.title }}</p>
        <p class="mt-0.5 text-sm text-[color:var(--vp-c-text-2)]">{{ status.desc }}</p>
      </div>
      <button
        class="mt-0.5 shrink-0 text-[color:var(--vp-c-text-3)] hover:text-[color:var(--vp-c-text-1)] transition"
        aria-label="Dismiss"
        @click="status = null"
      >✕</button>
    </div>
  </div>
</template>

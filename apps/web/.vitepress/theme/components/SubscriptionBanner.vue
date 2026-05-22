<script setup lang="ts">
import { ref, computed } from "vue";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();

const copy: Record<Lang, {
  eyebrow: string; title: string; description: string;
  email: string; terms: string; submit: string; privacy: string; privacyUrl: string;
  loadingTitle: string;
  successTitle: string; successDesc: string;
  alreadyPendingTitle: string; alreadyPendingDesc: string;
  alreadyActiveTitle: string; alreadyActiveDesc: string;
  errorTitle: string; errorDesc: string; termsErrorDesc: string;
}> = {
  en: {
    eyebrow: "Stay updated",
    title: "Get release notifications",
    description: "Subscribe to receive an email when new versions of ngx-contract-kit are published.",
    email: "your@email.com",
    terms: "I accept the",
    privacy: "privacy policy",
    privacyUrl: "/docs/legal/privacy",
    submit: "Subscribe",
    loadingTitle: "Sending…",
    successTitle: "Check your inbox",
    successDesc: "Confirm your subscription from your inbox.",
    alreadyPendingTitle: "Check your inbox",
    alreadyPendingDesc: "We already sent you a confirmation email. Check your inbox and confirm your subscription.",
    alreadyActiveTitle: "Already subscribed",
    alreadyActiveDesc: "This email is already receiving release notifications.",
    errorTitle: "Error",
    errorDesc: "Could not complete the subscription. Please try again.",
    termsErrorDesc: "You must accept the privacy policy to subscribe.",
  },
  es: {
    eyebrow: "Mantente al día",
    title: "Recibe notificaciones de versiones",
    description: "Suscríbete para recibir un email cuando se publiquen nuevas versiones de ngx-contract-kit.",
    email: "tu@email.com",
    terms: "Acepto la",
    privacy: "política de privacidad",
    privacyUrl: "/docs/legal/privacidad",
    submit: "Suscribirme",
    loadingTitle: "Enviando…",
    successTitle: "Revisa tu bandeja",
    successDesc: "Confirma la suscripción desde tu email.",
    alreadyPendingTitle: "Revisa tu bandeja",
    alreadyPendingDesc: "Ya te enviamos un email de confirmación. Revisa tu bandeja y confirma la suscripción.",
    alreadyActiveTitle: "Ya estás suscrito",
    alreadyActiveDesc: "Este email ya recibe notificaciones de nuevas versiones.",
    errorTitle: "Error",
    errorDesc: "No se pudo completar la suscripción. Inténtalo de nuevo.",
    termsErrorDesc: "Debes aceptar la política de privacidad para suscribirte.",
  },
};

const t = computed(() => copy[lang.value as Lang]);

type SubmitState = "idle" | "success" | "already-pending" | "already-active" | "error";

const email = ref("");
const acceptTerms = ref(false);
const loading = ref(false);
const termsError = ref(false);
const state = ref<SubmitState>("idle");

async function onSubmit() {
  if (loading.value) return;
  if (!acceptTerms.value) {
    termsError.value = true;
    return;
  }
  termsError.value = false;
  state.value = "idle";
  loading.value = true;

  try {
    const res = await fetch("https://codebyfran.es/api/projects/ngx-contract-kit/subscribe", {
      method: "POST",
      credentials: "omit",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        locale: lang.value,
        source: "banner",
        acceptTerms: acceptTerms.value,
        consentVersion: "2026-05-v1",
      }),
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    if (data.alreadyActive) {
      state.value = "already-active";
    } else if (data.alreadyPending) {
      state.value = "already-pending";
    } else {
      state.value = "success";
    }

    email.value = "";
    acceptTerms.value = false;
  } catch {
    state.value = "error";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="mt-12 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-5 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707] sm:p-8">
    <p class="font-heading text-xs font-semibold uppercase tracking-[0.18em]">
      <span class="bg-accent text-ink px-1.5 py-0.5">{{ t.eyebrow }}</span>
    </p>
    <h2 class="mt-3 font-heading text-xl text-[color:var(--vp-c-text-1)] md:text-2xl">
      {{ t.title }}
    </h2>
    <p class="mt-2 max-w-2xl text-sm text-[color:var(--vp-c-text-2)]">
      {{ t.description }}
    </p>

    <div v-if="state === 'success'" class="mt-5 border border-accent bg-accent/10 px-4 py-3">
      <p class="font-semibold text-[color:var(--vp-c-text-1)]">{{ t.successTitle }}</p>
      <p class="mt-0.5 text-sm text-[color:var(--vp-c-text-2)]">{{ t.successDesc }}</p>
    </div>

    <div v-else-if="state === 'already-pending'" class="mt-5 border border-accent bg-accent/10 px-4 py-3">
      <p class="font-semibold text-[color:var(--vp-c-text-1)]">{{ t.alreadyPendingTitle }}</p>
      <p class="mt-0.5 text-sm text-[color:var(--vp-c-text-2)]">{{ t.alreadyPendingDesc }}</p>
    </div>

    <div v-else-if="state === 'already-active'" class="mt-5 border border-[color:var(--vp-c-bg-alt)] px-4 py-3">
      <p class="font-semibold text-[color:var(--vp-c-text-1)]">{{ t.alreadyActiveTitle }}</p>
      <p class="mt-0.5 text-sm text-[color:var(--vp-c-text-2)]">{{ t.alreadyActiveDesc }}</p>
    </div>

    <template v-else>
      <form class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end" @submit.prevent="onSubmit">
        <input
          v-model="email"
          required
          type="email"
          :placeholder="t.email"
          class="w-full max-w-xs border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg)] px-3 py-2 text-sm text-[color:var(--vp-c-text-1)] placeholder:text-[color:var(--vp-c-text-3)] outline-none focus:border-accent dark:border-[#1f1f1f] dark:bg-[#0d0d0d]"
        />
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex items-center border border-accent bg-accent px-4 py-2 text-sm font-semibold text-ink shadow-card transition hover:brightness-95 disabled:opacity-50"
        >
          {{ loading ? t.loadingTitle : t.submit }}
        </button>
      </form>
      <label class="mt-3 flex items-center gap-2 text-xs text-[color:var(--vp-c-text-3)]" :class="{ 'text-red-500': termsError }">
        <input v-model="acceptTerms" type="checkbox" class="accent-[color:var(--vp-c-brand-1)]" @change="termsError = false" />
        <span>
          {{ t.terms }}
          <a :href="t.privacyUrl" class="underline underline-offset-2 hover:text-[color:var(--vp-c-text-1)]">{{ t.privacy }}</a>
        </span>
      </label>
      <p v-if="termsError" class="mt-1 text-xs text-red-500">{{ t.termsErrorDesc }}</p>
      <p v-if="state === 'error'" class="mt-2 text-xs text-red-500">{{ t.errorDesc }}</p>
    </template>
  </section>
</template>

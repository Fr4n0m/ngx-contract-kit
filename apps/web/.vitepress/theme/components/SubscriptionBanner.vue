<script setup lang="ts">
import { ref, computed } from "vue";
import { toast } from "vue-sonner";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();

const copy: Record<Lang, {
  eyebrow: string; title: string; description: string;
  email: string; terms: string; submit: string; privacy: string; privacyUrl: string;
  loadingTitle: string; successTitle: string; successDesc: string;
  errorTitle: string; errorDesc: string;
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
    errorTitle: "Error",
    errorDesc: "Could not complete the subscription.",
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
    errorTitle: "Error",
    errorDesc: "No se pudo completar la suscripción.",
  },
};

const t = computed(() => copy[lang.value as Lang]);

const email = ref("");
const acceptTerms = ref(false);
const loading = ref(false);

async function onSubmit() {
  if (loading.value) return;
  loading.value = true;

  const id = toast.loading(t.value.loadingTitle);

  try {
    const res = await fetch("https://www.codebyfran.es/api/projects/ngx-contract-kit/subscribe", {
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

    toast.success(t.value.successTitle, { id, description: t.value.successDesc });
    email.value = "";
    acceptTerms.value = false;
  } catch {
    toast.error(t.value.errorTitle, { id, description: t.value.errorDesc });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="mt-12 w-full border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-5 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707] sm:p-8">
    <p class="font-heading text-xs font-semibold uppercase tracking-[0.18em]">
      <span class="bg-accent text-ink px-1.5 py-0.5">{{ t.eyebrow }}</span>
    </p>
    <h2 class="mt-3 font-heading text-xl text-[color:var(--vp-c-text-1)] md:text-2xl">
      {{ t.title }}
    </h2>
    <p class="mt-2 max-w-2xl text-sm text-[color:var(--vp-c-text-2)]">
      {{ t.description }}
    </p>
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
        {{ t.submit }}
      </button>
    </form>
    <label class="mt-3 flex items-center gap-2 text-xs text-[color:var(--vp-c-text-3)]">
      <input v-model="acceptTerms" required type="checkbox" class="accent-[color:var(--vp-c-brand-1)]" />
      <span>
        {{ t.terms }}
        <a :href="t.privacyUrl" class="underline underline-offset-2 hover:text-[color:var(--vp-c-text-1)]">{{ t.privacy }}</a>
      </span>
    </label>
  </section>
</template>

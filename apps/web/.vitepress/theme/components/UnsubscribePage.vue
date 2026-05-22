<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLang, type Lang } from "../composables/lang";

const { lang } = useLang();

const copy: Record<Lang, {
  title: string; done: string;
  desc: string; doneDesc: string;
  confirm: string; back: string;
  noToken: string; errorDesc: string;
}> = {
  en: {
    title: "Unsubscribe",
    done: "Unsubscribed",
    desc: "Confirm you want to stop receiving notifications for new versions of Contract-kit.",
    doneDesc: "Your subscription has been cancelled. You won't receive any more release notifications.",
    confirm: "Confirm unsubscribe",
    back: "Back to home",
    noToken: "Invalid or expired unsubscribe link.",
    errorDesc: "Could not complete the unsubscribe. Please try again.",
  },
  es: {
    title: "Cancelar suscripción",
    done: "Baja completada",
    desc: "Confirma que deseas dejar de recibir notificaciones de nuevas versiones de Contract-kit.",
    doneDesc: "Tu suscripción ha sido cancelada. Ya no recibirás más notificaciones de nuevas versiones.",
    confirm: "Confirmar baja",
    back: "Volver al inicio",
    noToken: "Enlace de baja no válido o caducado.",
    errorDesc: "No se pudo completar la baja. Inténtalo de nuevo.",
  },
};

const t = ref(copy[lang.value as Lang] ?? copy.en);
const token = ref("");
const loading = ref(false);
const state = ref<"idle" | "done" | "error">("idle");
const apiError = ref("");

onMounted(() => {
  t.value = copy[lang.value as Lang] ?? copy.en;
  const url = new URL(window.location.href);
  token.value = url.searchParams.get("token") ?? "";
  console.debug("[unsubscribe] token from URL:", token.value || "(empty)");
});

async function confirm() {
  if (!token.value || loading.value) return;
  loading.value = true;
  state.value = "idle";
  apiError.value = "";

  try {
    const res = await fetch("https://codebyfran.es/api/projects/ngx-contract-kit/unsubscribe", {
      method: "POST",
      credentials: "omit",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: token.value }),
    });

    const data = await res.json().catch(() => ({}));
    console.debug("[unsubscribe] response", res.status, data);

    if (!res.ok) {
      apiError.value = `${res.status}: ${data.message ?? data.error ?? "unknown"}`;
      state.value = "error";
      return;
    }
    state.value = "done";
  } catch (err) {
    console.error("[unsubscribe] fetch error", err);
    apiError.value = String(err);
    state.value = "error";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg px-6 py-16 text-center">
    <p class="font-heading text-sm font-semibold uppercase tracking-[0.18em]">
      <span class="bg-accent text-ink px-1.5 py-0.5">Contract-kit</span>
    </p>
    <h1 class="mt-4 font-heading text-2xl text-[color:var(--vp-c-text-1)]">
      {{ state === "done" ? t.done : t.title }}
    </h1>
    <p class="mt-3 text-sm text-[color:var(--vp-c-text-2)]">
      {{ state === "done" ? t.doneDesc : t.desc }}
    </p>

    <p v-if="state === 'error'" class="mt-4 text-sm text-red-500">
      {{ t.errorDesc }}<template v-if="apiError"> ({{ apiError }})</template>
    </p>

    <p v-if="!token && state === 'idle'" class="mt-4 text-sm text-[color:var(--vp-c-text-3)]">
      {{ t.noToken }}
    </p>

    <div class="mt-6 flex justify-center gap-3">
      <button
        v-if="state !== 'done'"
        :disabled="loading || !token"
        class="inline-flex items-center border border-accent bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-50"
        @click="confirm"
      >
        {{ loading ? "…" : t.confirm }}
      </button>
      <a
        href="/"
        class="inline-flex items-center border border-[color:var(--vp-c-bg-alt)] px-4 py-2 text-sm text-[color:var(--vp-c-text-2)] transition hover:border-accent hover:text-ink"
      >
        {{ t.back }}
      </a>
    </div>
  </div>
</template>

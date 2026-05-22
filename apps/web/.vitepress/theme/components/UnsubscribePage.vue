<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toast } from "vue-sonner";

const token = ref("");
const loading = ref(false);
const done = ref(false);

onMounted(() => {
  const url = new URL(window.location.href);
  token.value = url.searchParams.get("token") ?? "";
});

async function confirm() {
  if (!token.value || loading.value) return;
  loading.value = true;

  const id = toast.loading("Procesando…");
  try {
    const res = await fetch("https://codebyfran.es/api/projects/ngx-contract-kit/unsubscribe", {
      method: "POST",
      credentials: "omit",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: token.value }),
    });

    if (!res.ok) throw new Error();

    toast.success("Baja completada", { id, description: "Ya no recibirás más notificaciones." });
    done.value = true;
  } catch {
    toast.error("Error", { id, description: "No se pudo completar la baja." });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg px-6 py-20 text-center">
    <p class="font-heading text-xs font-semibold uppercase tracking-[0.18em]">
      <span class="bg-accent text-ink px-1.5 py-0.5">ngx-contract-kit</span>
    </p>
    <h1 class="mt-4 font-heading text-2xl text-[color:var(--vp-c-text-1)]">
      {{ done ? "Baja completada" : "Cancelar suscripción" }}
    </h1>
    <p class="mt-3 text-sm text-[color:var(--vp-c-text-2)]">
      {{ done
        ? "Tu suscripción ha sido cancelada. Ya no recibirás notificaciones de nuevas versiones."
        : "Confirma que deseas dejar de recibir notificaciones de nuevas versiones de ngx-contract-kit." }}
    </p>
    <div class="mt-6 flex justify-center gap-3">
      <button
        v-if="!done"
        :disabled="loading || !token"
        class="inline-flex items-center border border-accent bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-50"
        @click="confirm"
      >
        Confirmar baja
      </button>
      <a
        href="/"
        class="inline-flex items-center border border-[color:var(--vp-c-bg-alt)] px-4 py-2 text-sm text-[color:var(--vp-c-text-2)] transition hover:border-accent hover:text-ink"
      >
        Volver al inicio
      </a>
    </div>
  </div>
</template>

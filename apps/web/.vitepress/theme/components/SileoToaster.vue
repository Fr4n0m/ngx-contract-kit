<script setup lang="ts">
import { onMounted } from "vue";
import { Toaster, toast } from "vue-sonner";
import { useLang } from "../composables/lang";

const { lang } = useLang();

const copy = {
  en: {
    confirmed: "Subscription confirmed",
    confirmedDesc: "You'll receive notifications for new releases.",
    unsubscribed: "Unsubscribed",
    unsubscribedDesc: "You won't receive any more notifications.",
    error: "Error",
    errorDesc: "Could not complete the operation.",
  },
  es: {
    confirmed: "Suscripción confirmada",
    confirmedDesc: "Recibirás avisos de nuevas versiones.",
    unsubscribed: "Baja completada",
    unsubscribedDesc: "Ya no recibirás más notificaciones.",
    error: "Error",
    errorDesc: "No se pudo completar la operación.",
  },
};

onMounted(() => {
  const url = new URL(window.location.href);
  const state = url.searchParams.get("subscription");
  if (!state) return;

  const t = copy[lang.value as keyof typeof copy] ?? copy.en;

  if (state === "confirmed") {
    toast.success(t.confirmed, { description: t.confirmedDesc });
  } else if (state === "unsubscribed") {
    toast.success(t.unsubscribed, { description: t.unsubscribedDesc });
  } else if (state === "error") {
    toast.error(t.error, { description: t.errorDesc });
  }

  url.searchParams.delete("subscription");
  window.history.replaceState({}, "", url.toString());
});
</script>

<template>
  <Teleport to="body">
    <Toaster position="bottom-left" rich-colors />
  </Teleport>
</template>

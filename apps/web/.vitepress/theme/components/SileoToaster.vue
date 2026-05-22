<script setup lang="ts">
import { onMounted } from "vue";
import { Toaster, toast } from "vue-sonner";

onMounted(() => {
  const url = new URL(window.location.href);
  const state = url.searchParams.get("subscription");
  if (!state) return;

  if (state === "confirmed") {
    toast.success("Suscripción confirmada", { description: "Recibirás avisos de nuevas versiones." });
  } else if (state === "unsubscribed") {
    toast.success("Baja completada", { description: "Ya no recibirás más notificaciones." });
  } else if (state === "error") {
    toast.error("Error", { description: "No se pudo completar la operación." });
  }

  url.searchParams.delete("subscription");
  window.history.replaceState({}, "", url.toString());
});
</script>

<template>
  <Toaster position="bottom-left" rich-colors />
</template>

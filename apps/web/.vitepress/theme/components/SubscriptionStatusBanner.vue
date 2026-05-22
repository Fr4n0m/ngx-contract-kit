<script setup lang="ts">
import { ref, onMounted } from "vue";
import SubscriptionBanner, { type SubmitState } from "./SubscriptionBanner.vue";

const URL_TO_STATE: Record<string, SubmitState> = {
  confirmed: "confirmed",
  unsubscribed: "unsubscribed",
  error: "error",
};

const state = ref<SubmitState | null>(null);

onMounted(() => {
  const url = new URL(window.location.href);
  const param = url.searchParams.get("subscription") ?? "";
  if (!URL_TO_STATE[param]) return;

  state.value = URL_TO_STATE[param];
  url.searchParams.delete("subscription");
  window.history.replaceState({}, "", url.toString());
});
</script>

<template>
  <div v-if="state" class="px-[clamp(1rem,4vw,4rem)]">
    <SubscriptionBanner :initial-state="state" />
  </div>
</template>

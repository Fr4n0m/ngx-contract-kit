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

function close() {
  state.value = null;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="state"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
        @keydown="onKeydown"
      >
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
          @click="close"
        />
        <div class="relative z-10 w-full max-w-xl">
          <SubscriptionBanner :initial-state="state" compact />
          <button
            class="absolute top-3 right-3 z-20 flex size-7 items-center justify-center text-[color:var(--vp-c-text-3)] transition hover:text-[color:var(--vp-c-text-1)]"
            aria-label="Close"
            @click="close"
          >✕</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  commands: string[];
  compact?: boolean;
}>();

const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

const rawCommands = computed(() => props.commands.join("\n"));

async function copyCommands(): Promise<void> {
  if (!rawCommands.value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(rawCommands.value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = rawCommands.value;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  copied.value = true;
  if (copiedTimer) {
    clearTimeout(copiedTimer);
  }
  copiedTimer = setTimeout(() => {
    copied.value = false;
  }, 1200);
}
</script>

<template>
  <div
    class="relative min-w-0 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)] p-2.5"
  >
    <button
      type="button"
      class="absolute right-2 top-2 inline-flex items-center gap-1.5 border border-[#3a3a3a] bg-[#2a2a2a] px-2 py-1 text-xs font-semibold text-[#d2ff00] transition hover:border-accent hover:bg-accent hover:text-[#1f1f1f]"
      @click="copyCommands"
    >
      <!-- Clipboard icon -->
      <svg v-if="!copied" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <!-- Check icon -->
      <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {{ copied ? "Copied" : "Copy" }}
    </button>
    <div class="space-y-1 pr-14">
      <div
        v-for="command in commands"
        :key="command"
        class="flex min-w-0 items-start gap-2 font-body text-sm"
      >
        <span class="select-none text-accent">$</span>
        <span class="min-w-0 break-all text-[#ffffff] dark:text-accent">{{
          command
        }}</span>
      </div>
    </div>
  </div>
</template>

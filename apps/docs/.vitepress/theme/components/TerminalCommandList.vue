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
      class="absolute right-2 top-2 border border-[#3a3a3a] bg-[#2a2a2a] px-2 py-1 text-xs font-semibold text-[#d2ff00] transition hover:border-accent hover:bg-accent hover:text-[#1f1f1f]"
      @click="copyCommands"
    >
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

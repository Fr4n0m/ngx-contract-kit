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
    class="rounded-xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)]"
    :class="compact ? 'p-2' : 'p-3'"
  >
    <div class="mb-2 flex items-center justify-end">
      <button
        type="button"
        class="rounded-md border border-[color:var(--vp-c-bg-alt)] px-2 py-1 text-xs font-medium text-[color:var(--vp-c-text-2)] transition hover:text-accent"
        @click="copyCommands"
      >
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <div class="space-y-1">
      <div
        v-for="command in commands"
        :key="command"
        class="flex items-center gap-2 font-body text-sm"
      >
        <span class="select-none text-accent">$</span>
        <span class="text-accent">{{ command }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  fileLabel?: string;
  code: string;
}>();

const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

async function copyCode(): Promise<void> {
  if (!props.code) {
    return;
  }

  try {
    await navigator.clipboard.writeText(props.code);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = props.code;
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
  <div class="min-w-0 overflow-hidden rounded-xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)]">
    <div
      class="flex items-center justify-between gap-2 border-b border-[color:var(--vp-c-bg-alt)] bg-black/20 px-3 py-1.5 text-xs text-[color:var(--vp-c-text-2)] dark:bg-white/5"
    >
      <span class="min-w-0 truncate">{{ fileLabel }}</span>
      <div class="flex shrink-0 items-center gap-2">
        <span class="uppercase tracking-wide text-accent">json</span>
        <button
          type="button"
          class="rounded-md border border-[color:var(--vp-c-bg-alt)] px-2 py-1 text-xs font-medium text-[color:var(--vp-c-text-2)] transition hover:text-accent"
          @click="copyCode"
        >
          {{ copied ? "Copied" : "Copy" }}
        </button>
      </div>
    </div>
    <pre class="m-0 overflow-x-auto whitespace-pre-wrap break-words p-3 md:whitespace-pre"><code class="font-body text-sm text-accent">{{ code }}</code></pre>
  </div>
</template>

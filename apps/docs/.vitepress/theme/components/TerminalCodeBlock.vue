<script setup lang="ts">
import { computed, ref } from "vue";
import { detectCodeLanguage, highlightCodeHtml } from "../composables/codeHighlight";

const props = defineProps<{
  fileLabel?: string;
  lang?: string;
  code: string;
}>();

const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

const detectedLang = computed(() => detectCodeLanguage(props.lang, props.code));
const highlightedCode = computed(() =>
  highlightCodeHtml(props.code, detectedLang.value),
);

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
  <div
    class="min-w-0 overflow-hidden border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)]"
  >
    <div
      class="flex items-center justify-between gap-2 border-b border-[color:var(--vp-c-bg-alt)] bg-[#070707] px-3 py-1.5 text-xs text-[#ffffff] dark:bg-[#1f1f1f] dark:text-[#ffffff]"
    >
      <span class="min-w-0 truncate">{{ fileLabel }}</span>
      <div class="flex shrink-0 items-center gap-2">
        <span class="uppercase tracking-wide text-accent">{{ detectedLang }}</span>
        <button
          type="button"
          class="border border-[#3a3a3a] bg-[#2a2a2a] px-2 py-1 text-xs font-semibold text-[#d2ff00] transition hover:border-accent hover:bg-accent hover:text-[#1f1f1f]"
          @click="copyCode"
        >
          {{ copied ? "Copied" : "Copy" }}
        </button>
      </div>
    </div>
    <pre
      class="m-0 overflow-x-auto whitespace-pre-wrap break-words p-3 md:whitespace-pre"
    ><code class="demo-code font-mono text-sm text-[#ffffff]" v-html="highlightedCode" /></pre>
  </div>
</template>

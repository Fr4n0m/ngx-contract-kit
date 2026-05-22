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
  if (!props.code) return;
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
  if (copiedTimer) clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => { copied.value = false; }, 1200);
}
</script>

<template>
  <div class="min-w-0 overflow-hidden border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)]">
    <div class="flex items-center justify-between gap-2 border-b border-[color:var(--vp-c-bg-alt)] bg-[#0d0d0d] px-3 py-1.5 text-xs text-white">
      <span class="min-w-0 truncate">{{ fileLabel }}</span>
      <div class="flex shrink-0 items-center gap-2">
        <span class="uppercase tracking-wide text-accent">{{ detectedLang }}</span>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 border border-[#3a3a3a] bg-[#2a2a2a] px-2 py-1 text-xs font-semibold text-[#d2ff00] transition hover:border-accent hover:bg-accent hover:text-[#1f1f1f]"
          @click="copyCode"
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
      </div>
    </div>
    <pre class="m-0 overflow-x-auto whitespace-pre-wrap break-words p-3 md:whitespace-pre"><code class="demo-code font-mono text-sm text-white" v-html="highlightedCode" /></pre>
  </div>
</template>

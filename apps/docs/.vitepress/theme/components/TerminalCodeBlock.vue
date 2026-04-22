<script setup lang="ts">
defineProps<{
  fileLabel?: string;
  code: string;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)]">
    <div
      class="flex items-center justify-between border-b border-[color:var(--vp-c-bg-alt)] bg-black/20 px-3 py-1.5 text-xs text-[color:var(--vp-c-text-2)] dark:bg-white/5"
    >
      <span>{{ fileLabel }}</span>
      <span class="uppercase tracking-wide text-accent">json</span>
    </div>
    <pre class="m-0 overflow-x-auto p-3"><code class="font-body text-sm text-accent">{{ code }}</code></pre>
  </div>
</template>


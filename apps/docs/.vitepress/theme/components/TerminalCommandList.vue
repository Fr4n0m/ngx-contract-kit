<script setup lang="ts">
defineProps<{
  commands: string[];
  compact?: boolean;
}>();
</script>

<template>
  <div
    class="rounded-xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)]"
    :class="compact ? 'p-2' : 'p-3'"
  >
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

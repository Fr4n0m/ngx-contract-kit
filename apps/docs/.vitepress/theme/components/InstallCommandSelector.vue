<script setup lang="ts">
import { computed, ref } from "vue";
import { en, es } from "../../../i18n";
import { useLang, type Lang } from "../composables/lang";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const props = withDefaults(
  defineProps<{
    modelValue?: PackageManager;
  }>(),
  {
    modelValue: "pnpm"
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: PackageManager): void;
}>();

const { lang } = useLang();
const dict: Record<Lang, typeof en> = { en, es };
const t = computed(() => dict[lang.value as Lang].quickstart.installSelector);

const fallbackManager = ref<PackageManager>("pnpm");

const manager = computed<PackageManager>({
  get: () => props.modelValue ?? fallbackManager.value,
  set: (value) => {
    fallbackManager.value = value;
    emit("update:modelValue", value);
  }
});

const commandByManager: Record<PackageManager, string> = {
  pnpm: "pnpm add @ngx-contract-kit/cli @ngx-contract-kit/core",
  npm: "npm install @ngx-contract-kit/cli @ngx-contract-kit/core",
  yarn: "yarn add @ngx-contract-kit/cli @ngx-contract-kit/core",
  bun: "bun add @ngx-contract-kit/cli @ngx-contract-kit/core"
};

const managers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];
const command = computed(() => commandByManager[manager.value]);
</script>

<template>
  <div class="rounded-2xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card">
    <label for="pkg-manager" class="mb-2 block text-sm font-semibold text-[color:var(--vp-c-text-1)]">
      {{ t.label }}
    </label>
    <select
      id="pkg-manager"
      v-model="manager"
      class="w-full rounded-lg border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg)] px-3 py-2 text-sm text-[color:var(--vp-c-text-1)]"
    >
      <option v-for="item in managers" :key="item" :value="item">
        {{ t.options[item] }}
      </option>
    </select>

    <div class="mt-3 rounded-xl border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-code-bg)] p-3">
      <div class="flex items-center gap-2 font-body text-sm">
        <span class="select-none text-accent">$</span>
        <span class="text-accent">{{ command }}</span>
      </div>
    </div>
  </div>
</template>


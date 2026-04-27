<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import { highlightCodeHtml } from "../composables/codeHighlight";

const props = defineProps<{
  contractLabel: string;
  coreLabel: string;
  generatorTsLabel: string;
  angularLabel: string;
  nestLabel: string;
  zodLabel: string;
  mockLabel: string;
  diffLabel: string;
  cliLabel: string;
  generateBadge: string;
  flowTitle: string;
  flowDescription: string;
  runLabel: string;
  runningLabel: string;
  replayLabel: string;
  contractStep: string;
  engineStep: string;
  outputStep: string;
}>();

const CONTRACT_CODE = `{
  "service": "users",
  "endpoints": [
    {
      "path": "/users/:id",
      "method": "GET",
      "params": { "id": "string" },
      "response": {
        "200": { "id": "string", "email": "string" },
        "404": { "message": "string" }
      }
    }
  ]
}`;

const CORE_CODE = `// @fr4n0m/core
import { buildContractModel, buildContractSummary } from "@fr4n0m/core";

const contracts = loadContracts("contracts/**/*.contract.json");
const summary = buildContractSummary(contracts);
const model = buildContractModel(contracts);

// generated/contract-summary.json
// generated/contract-model.ts`;

const GENERATOR_TS_CODE = `// @fr4n0m/generator-typescript
import { generateTypescriptModel } from "@fr4n0m/generator-typescript";

const code = generateTypescriptModel({
  contracts,
  namespace: "ContractModel"
});

writeFile("generated/contract-model.ts", code);`;

const ANGULAR_CODE = `// @fr4n0m/generator-angular-client
import type { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type { ContractModel } from "./contract-model";

export class ContractKitClient {
  constructor(private readonly http: HttpClient) {}

  users_getUser(
    input: ContractModel["users.getUser"]
  ): Observable<ContractModel["users.getUser"]["response"]["200"]> {
    return this.request("GET", "/users/:id", input);
  }
}`;

const NESTJS_CODE = `// @fr4n0m/plugin-nestjs
import { Controller, Get, Param } from "@nestjs/common";

@Controller()
export class ContractController {
  @Get("/users/:id")
  users_getUser(@Param("id") id: string) {
    throw new Error("Implement with your service layer");
  }
}`;

const ZOD_CODE = `// @fr4n0m/validator-zod
import { z } from "zod";

export const zodSchemas = {
  "users.getUser": {
    params: z.object({ id: z.string() }),
    response: {
      "200": z.object({ id: z.string(), email: z.string() }),
      "404": z.object({ message: z.string() })
    }
  }
} as const;`;

const MOCK_CODE = `// @fr4n0m/mock-generator output
{
  "users.getUser": {
    "responseByStatus": {
      "200": { "id": "user_1", "email": "dev@team.com" },
      "404": { "message": "User not found" }
    }
  }
}`;

const DIFF_CODE = `// @fr4n0m/contract-diff report
{
  "breaking": true,
  "changes": [
    {
      "type": "response_field_removed",
      "endpoint": "users.getUser",
      "status": "200",
      "field": "email"
    }
  ]
}`;

const CLI_CODE = `$ contract-kit init
$ contract-kit generate
$ contract-kit validate
$ contract-kit check --json --report reports/compatibility.json
$ contract-kit mock`;

type TabId =
  | "contract"
  | "core"
  | "generatorTs"
  | "angular"
  | "nestjs"
  | "zod"
  | "mock"
  | "diff"
  | "cli";

type OutputTabId = Exclude<TabId, "contract">;

const activeTab = ref<OutputTabId>("angular");
const isRunning = ref(false);
const isCompleted = ref(false);
const progress = ref(0);
let flowTimer: ReturnType<typeof setInterval> | undefined;

const tabData: Record<TabId, { label: string; lang: string; file: string; code: string }> = {
  contract: {
    label: props.contractLabel,
    lang: "json",
    file: "contracts/users.contract.json",
    code: CONTRACT_CODE,
  },
  core: {
    label: props.coreLabel,
    lang: "ts",
    file: "generated/contract-summary.json + contract-model.ts",
    code: CORE_CODE,
  },
  generatorTs: {
    label: props.generatorTsLabel,
    lang: "ts",
    file: "generated/contract-model.ts",
    code: GENERATOR_TS_CODE,
  },
  angular: {
    label: props.angularLabel,
    lang: "ts",
    file: "generated/angular-client.ts",
    code: ANGULAR_CODE,
  },
  nestjs: {
    label: props.nestLabel,
    lang: "ts",
    file: "generated/nest-controller.ts",
    code: NESTJS_CODE,
  },
  zod: {
    label: props.zodLabel,
    lang: "ts",
    file: "generated/zod-schemas.ts",
    code: ZOD_CODE,
  },
  mock: {
    label: props.mockLabel,
    lang: "json",
    file: "generated/mocks.json",
    code: MOCK_CODE,
  },
  diff: {
    label: props.diffLabel,
    lang: "json",
    file: "reports/compatibility.json",
    code: DIFF_CODE,
  },
  cli: {
    label: props.cliLabel,
    lang: "bash",
    file: "terminal",
    code: CLI_CODE,
  },
};

const outputTabs: OutputTabId[] = [
  "core",
  "generatorTs",
  "angular",
  "nestjs",
  "zod",
  "mock",
  "diff",
  "cli",
];

const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

const highlightedCode = computed(() => {
  const current = tabData[activeTab.value];
  return highlightCodeHtml(current.code, current.lang);
});

async function copyCode(): Promise<void> {
  const code = tabData[activeTab.value].code;
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = code;
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

function stopFlowTimer(): void {
  if (!flowTimer) return;
  clearInterval(flowTimer);
  flowTimer = undefined;
}

function resetFlow(): void {
  stopFlowTimer();
  isRunning.value = false;
  isCompleted.value = false;
  progress.value = 0;
  activeTab.value = "angular";
}

function runFlow(): void {
  if (isRunning.value) return;
  resetFlow();
  isRunning.value = true;
  flowTimer = setInterval(() => {
    progress.value = Math.min(progress.value + 2, 100);
    if (progress.value >= 65) {
      const normalized = (progress.value - 65) / 35;
      const index = Math.min(Math.floor(normalized * outputTabs.length), outputTabs.length - 1);
      activeTab.value = outputTabs[Math.max(0, index)];
    }
    if (progress.value >= 100) {
      stopFlowTimer();
      isRunning.value = false;
      isCompleted.value = true;
    }
  }, 70);
}

onUnmounted(() => {
  stopFlowTimer();
  if (copiedTimer) clearTimeout(copiedTimer);
});
</script>

<template>
  <div class="landing-card min-w-0 overflow-hidden border border-gray-200 bg-white shadow-card dark:border-[#1f1f1f] dark:bg-[#070707]">

    <!-- Flow header: title, description, run button, progress -->
    <div class="border-b border-gray-200 bg-gray-50 px-3 py-3 dark:border-[#1a1a1a] dark:bg-[#0d0d0d]">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="max-w-3xl">
          <h3 class="font-heading text-base text-gray-900 dark:text-white">
            {{ flowTitle }}
          </h3>
          <p class="mt-1 text-xs text-gray-500 dark:text-[#b7b7b7]">
            {{ flowDescription }}
          </p>
        </div>
        <button
          type="button"
          class="inline-flex items-center border border-accent bg-accent px-3 py-1.5 text-xs font-semibold text-[#1f1f1f] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isRunning"
          @click="isCompleted ? resetFlow() : runFlow()"
        >
          {{ isRunning ? runningLabel : isCompleted ? replayLabel : runLabel }}
        </button>
      </div>

      <div class="mt-3">
        <div class="relative h-1.5 w-full overflow-hidden bg-gray-200 dark:bg-[#1f1f1f]">
          <div
            class="h-full bg-accent transition-[width] duration-100"
            :style="{ width: `${progress}%` }"
          />
        </div>
        <div class="mt-3 grid gap-2 text-[10px] uppercase tracking-[0.14em] text-gray-500 dark:text-[#9c9c9c] sm:grid-cols-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 bg-accent" />
            <span>{{ contractStep }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span
              class="h-2.5 w-2.5 transition-colors"
              :class="progress >= 20 ? 'bg-accent' : 'bg-gray-300 dark:bg-[#1f1f1f]'"
            />
            <span>{{ engineStep }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span
              class="h-2.5 w-2.5 transition-colors"
              :class="progress >= 65 ? 'bg-accent' : 'bg-gray-300 dark:bg-[#1f1f1f]'"
            />
            <span>{{ outputStep }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs bar -->
    <div class="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-white px-3 py-2 dark:border-[#1a1a1a] dark:bg-[#070707]">
      <button
        v-for="tabId in outputTabs"
        :key="tabId"
        type="button"
        :class="[
          'px-3 py-1.5 text-xs font-semibold transition',
          activeTab === tabId
            ? 'bg-accent text-[#1f1f1f]'
            : 'text-gray-400 hover:text-gray-800 dark:text-[#888] dark:hover:text-white',
        ]"
        @click="activeTab = tabId"
      >
        {{ tabData[tabId].label }}
      </button>

      <span class="ml-auto flex items-center gap-1 px-1 text-[10px] text-gray-400 dark:text-[#555]">
        <span>→</span>
        <span class="font-mono text-gray-900 dark:text-[#d2ff00]">{{ generateBadge }}</span>
      </span>
    </div>

    <!-- File bar: path + lang + copy -->
    <div class="flex items-center justify-between gap-2 border-b border-gray-200 bg-gray-50 px-3 py-1.5 text-xs dark:border-[#1a1a1a] dark:bg-[#0d0d0d]">
      <span class="min-w-0 truncate font-mono text-gray-500 dark:text-[#888]">
        {{ tabData[activeTab].file }}
      </span>
      <div class="flex shrink-0 items-center gap-2">
        <span class="font-mono uppercase tracking-wide text-gray-700 dark:text-accent">
          {{ tabData[activeTab].lang }}
        </span>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700 transition hover:border-accent hover:bg-accent hover:text-[#1f1f1f] dark:border-[#3a3a3a] dark:bg-[#2a2a2a] dark:text-[#d2ff00] dark:hover:border-accent dark:hover:bg-accent dark:hover:text-[#1f1f1f]"
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

    <!-- Code area: always dark terminal -->
    <pre class="m-0 max-h-72 overflow-auto bg-[#070707] p-4 text-sm leading-relaxed"><code class="demo-code font-mono text-white" v-html="highlightedCode" /></pre>
  </div>
</template>

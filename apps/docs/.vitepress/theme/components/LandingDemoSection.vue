<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import { useReveal } from "../composables/useReveal";
import { highlightCodeHtml } from "../composables/codeHighlight";

const props = defineProps<{
  title: string;
  description: string;
  valueTitle: string;
  valueItems: string[];
  outputTitle: string;
  outputItems: string[];
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
  parallelNote: string;
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

const highlightedContractCode = computed(() =>
  highlightCodeHtml(CONTRACT_CODE, "json"),
);

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
  copiedTimer = setTimeout(() => {
    copied.value = false;
  }, 1200);
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
      const index = Math.min(
        Math.floor(normalized * outputTabs.length),
        outputTabs.length - 1,
      );
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

const titleRef = useReveal(0);
const descriptionRef = useReveal(70);
const panelRef = useReveal(140);
</script>

<template>
  <section id="see-it-in-action" class="mt-12">
    <h2
      ref="titleRef"
      class="reveal mb-2 font-heading text-2xl text-[color:var(--vp-c-text-1)] md:text-3xl"
    >
      {{ title }}
    </h2>
    <p
      ref="descriptionRef"
      class="reveal mb-6 max-w-4xl text-[color:var(--vp-c-text-2)]"
    >
      {{ description }}
    </p>

    <div class="mb-6 grid gap-4 lg:grid-cols-2">
      <article
        class="landing-card min-w-0 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707]"
      >
        <h3 class="font-heading text-lg text-[color:var(--vp-c-text-1)]">
          {{ valueTitle }}
        </h3>
        <ul class="mt-2 space-y-2 text-[color:var(--vp-c-text-2)]">
          <li
            v-for="item in valueItems"
            :key="item"
            class="flex items-start gap-2"
          >
            <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
            <span class="min-w-0 break-words">{{ item }}</span>
          </li>
        </ul>
      </article>

      <article
        class="landing-card min-w-0 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707]"
      >
        <h3 class="font-heading text-lg text-[color:var(--vp-c-text-1)]">
          {{ outputTitle }}
        </h3>
        <ul class="mt-2 space-y-2 text-[color:var(--vp-c-text-2)]">
          <li
            v-for="item in outputItems"
            :key="item"
            class="flex items-start gap-2"
          >
            <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
            <span class="min-w-0 break-words">{{ item }}</span>
          </li>
        </ul>
      </article>
    </div>

    <div
      ref="panelRef"
      class="reveal landing-card min-w-0 overflow-hidden border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] shadow-card dark:border-[#1f1f1f] dark:bg-[#070707]"
    >
      <!-- Flow header: title, description, run button, progress -->
      <div class="border-b border-[color:var(--vp-c-divider)] bg-[color:var(--vp-c-bg-alt)] px-3 py-3 dark:border-[#1a1a1a] dark:bg-[#0d0d0d]">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="max-w-3xl">
            <h3 class="font-heading text-base text-[color:var(--vp-c-text-1)] dark:text-[#ffffff]">
              {{ flowTitle }}
            </h3>
            <p class="mt-1 text-xs text-[color:var(--vp-c-text-2)] dark:text-[#b7b7b7]">
              {{ flowDescription }}
            </p>
          </div>
          <button
            type="button"
            class="inline-flex items-center border border-accent bg-accent px-3 py-1.5 text-xs font-semibold text-[#1f1f1f] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="isRunning"
            @click="isCompleted ? resetFlow() : runFlow()"
          >
            {{
              isRunning
                ? runningLabel
                : isCompleted
                  ? replayLabel
                  : runLabel
            }}
          </button>
        </div>

        <div class="mt-3">
          <div class="relative h-1.5 w-full overflow-hidden bg-[color:var(--vp-c-divider)] dark:bg-[#1f1f1f]">
            <div
              class="h-full bg-accent transition-[width] duration-100"
              :style="{ width: `${progress}%` }"
            />
          </div>
          <div class="mt-3 grid gap-2 text-[10px] uppercase tracking-[0.14em] text-[color:var(--vp-c-text-3)] dark:text-[#9c9c9c] sm:grid-cols-3">
            <div class="flex items-center gap-2">
              <span
                class="h-2.5 w-2.5"
                :class="progress < 20 ? 'bg-accent' : 'bg-accent'"
              />
              <span>{{ contractStep }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="h-2.5 w-2.5"
                :class="progress >= 20 ? 'bg-accent' : 'bg-[color:var(--vp-c-divider)] dark:bg-[#1f1f1f]'"
              />
              <span>{{ engineStep }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="h-2.5 w-2.5"
                :class="progress >= 65 ? 'bg-accent' : 'bg-[color:var(--vp-c-divider)] dark:bg-[#1f1f1f]'"
              />
              <span>{{ outputStep }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs bar -->
      <div class="flex flex-wrap items-center gap-1 border-b border-[color:var(--vp-c-divider)] bg-[color:var(--vp-c-bg)] px-3 py-2 dark:border-[#1a1a1a] dark:bg-[#070707]">
        <button
          v-for="tabId in outputTabs"
          :key="tabId"
          type="button"
          :class="[
            'px-3 py-1.5 text-xs font-semibold transition',
            activeTab === tabId
              ? 'bg-accent text-[#1f1f1f]'
              : 'text-[color:var(--vp-c-text-3)] hover:text-[color:var(--vp-c-text-1)] dark:text-[#888] dark:hover:text-[#ffffff]',
          ]"
          @click="activeTab = tabId"
        >
          {{ tabData[tabId].label }}
        </button>

        <span class="ml-auto flex items-center gap-1 px-1 text-[10px] text-[color:var(--vp-c-text-3)] dark:text-[#555]">
          <span>→</span>
          <span class="font-mono text-ink dark:text-[#d2ff00]">{{ generateBadge }}</span>
        </span>
      </div>

      <!-- File bar: path + lang + copy -->
      <div
        class="flex items-center justify-between gap-2 border-b border-[color:var(--vp-c-divider)] bg-[color:var(--vp-c-bg-alt)] px-3 py-1.5 text-xs dark:border-[#1a1a1a] dark:bg-[#0d0d0d]"
      >
        <span class="min-w-0 truncate font-mono text-[color:var(--vp-c-text-2)] dark:text-[#888]">{{ tabData[activeTab].file }}</span>
        <div class="flex shrink-0 items-center gap-2">
          <span class="font-mono uppercase tracking-wide text-ink dark:text-accent">{{
            tabData[activeTab].lang
          }}</span>
          <button
            type="button"
            class="border border-[color:var(--vp-c-divider)] bg-[color:var(--vp-c-bg-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--vp-c-text-1)] transition hover:border-accent hover:bg-accent hover:text-[#1f1f1f] dark:border-[#3a3a3a] dark:bg-[#2a2a2a] dark:text-[#d2ff00]"
            @click="copyCode"
          >
            {{ copied ? "Copied" : "Copy" }}
          </button>
        </div>
      </div>

      <!-- Code area: always dark terminal, user confirmed this is fine -->
      <pre
        class="m-0 max-h-72 overflow-auto bg-[#070707] p-4 text-sm leading-relaxed"
      ><code class="demo-code font-mono text-[#ffffff]" v-html="highlightedCode" /></pre>
    </div>
  </section>
</template>

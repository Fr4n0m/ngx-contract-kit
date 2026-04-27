<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from "vue";

defineProps<{
  runLabel: string;
  runningLabel: string;
  replayLabel: string;
}>();

const CAT_CMD = "cat contracts/users.contract.json";
const GEN_CMD = "contract-kit generate";

const JSON_LINES = [
  "{",
  '  "service": "users",',
  '  "endpoints": [{',
  '    "path": "/users/:id",',
  '    "method": "GET",',
  '    "response": {',
  '      "200": { "id": "string", "email": "string" },',
  '      "404": { "message": "string" }',
  '    }',
  '  }]',
  "}",
] as const;

const OUTPUT_LINES = [
  { text: "✓ Loading contracts/users.contract.json", type: "success" },
  { text: "✓ Building contract model...", type: "success" },
  { text: "✓ Running 6 generators in parallel...", type: "success" },
  { text: "  → generated/contract-model.ts", type: "file" },
  { text: "  → generated/angular-client.ts", type: "file" },
  { text: "  → generated/nest-controller.ts", type: "file" },
  { text: "  → generated/zod-schemas.ts", type: "file" },
  { text: "  → generated/mocks.json", type: "file" },
  { text: "  → reports/compatibility.json", type: "file" },
  { text: "✓ Done. 6 files generated in 127ms", type: "done" },
] as const;

const GENERATED_FILES = [
  {
    name: "contract-model.ts",
    lang: "TS",
    lines: [
      "export namespace ContractModel {",
      "  export interface GetUser {",
      "    params: { id: string };",
      "    response: {",
      "      200: { id: string; email: string };",
      "      404: { message: string };",
      "    };",
      "  }",
      "}",
    ],
  },
  {
    name: "angular-client.ts",
    lang: "TS",
    lines: [
      "export class ContractKitClient {",
      "  users_getUser(",
      "    input: ContractModel['users.getUser']",
      "  ): Observable<",
      "    ContractModel",
      "      ['users.getUser']['response']['200']",
      "  > {",
      "    return this.request('GET', '/users/:id', input);",
      "  }",
      "}",
    ],
  },
  {
    name: "zod-schemas.ts",
    lang: "TS",
    lines: [
      "export const schemas = {",
      "  'users.getUser': {",
      "    params: z.object({",
      "      id: z.string()",
      "    }),",
      "    response: {",
      "      200: z.object({",
      "        id: z.string(),",
      "        email: z.string()",
      "      })",
      "    }",
      "  }",
      "} as const;",
    ],
  },
  {
    name: "nest-controller.ts",
    lang: "TS",
    lines: [
      "@Controller()",
      "export class ContractController {",
      "  @Get('/users/:id')",
      "  users_getUser(",
      "    @Param('id') id: string",
      "  ) {",
      "    return this.usersService",
      "      .findOne(id);",
      "  }",
      "}",
    ],
  },
  {
    name: "mocks.json",
    lang: "JSON",
    lines: [
      "{",
      '  "users.getUser": {',
      '    "responseByStatus": {',
      '      "200": {',
      '        "id": "user_1",',
      '        "email": "dev@team.com"',
      "      },",
      '      "404": {',
      '        "message": "User not found"',
      "      }",
      "    }",
      "  }",
      "}",
    ],
  },
  {
    name: "compatibility.json",
    lang: "JSON",
    lines: [
      "{",
      '  "breaking": false,',
      '  "changes": [],',
      '  "summary": {',
      '    "from": "v1.0.0",',
      '    "to": "v1.1.0",',
      '    "status": "compatible"',
      "  }",
      "}",
    ],
  },
] as const;

type Phase = "idle" | "cat-typing" | "cat-out" | "gen-typing" | "gen-out" | "done";

const root = useTemplateRef<HTMLElement>("root");
const phase = ref<Phase>("idle");
const typedCat = ref("");
const typedGenerate = ref("");
const visibleJsonLines = ref<number[]>([]);
const visibleLines = ref<number[]>([]);
const showFiles = ref(false);
const autoRunCountdown = ref(0);

let timers: ReturnType<typeof setTimeout>[] = [];
let autoRunTimer: ReturnType<typeof setTimeout> | undefined;
let countdownInterval: ReturnType<typeof setInterval> | undefined;
let observer: IntersectionObserver | undefined;

function clearTimers(): void {
  timers.forEach(clearTimeout);
  timers = [];
}

function cancelAutoRun(): void {
  if (autoRunTimer) { clearTimeout(autoRunTimer); autoRunTimer = undefined; }
  if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = undefined; }
  autoRunCountdown.value = 0;
}

function reset(): void {
  clearTimers();
  cancelAutoRun();
  phase.value = "idle";
  typedCat.value = "";
  typedGenerate.value = "";
  visibleJsonLines.value = [];
  visibleLines.value = [];
  showFiles.value = false;
}

function run(): void {
  if (phase.value !== "idle") return;
  cancelAutoRun();
  reset();

  const C = 38; // ms per character

  // ── Phase 1: type cat command ──────────────────────────────
  phase.value = "cat-typing";
  CAT_CMD.split("").forEach((char, i) => {
    timers.push(setTimeout(() => { typedCat.value += char; }, i * C));
  });

  const catDone = CAT_CMD.length * C + 180;

  // ── Phase 2: stream JSON output ────────────────────────────
  timers.push(setTimeout(() => { phase.value = "cat-out"; }, catDone));
  JSON_LINES.forEach((_, i) => {
    timers.push(
      setTimeout(
        () => { visibleJsonLines.value = [...visibleJsonLines.value, i]; },
        catDone + i * 42,
      ),
    );
  });

  const jsonDone = catDone + JSON_LINES.length * 42 + 340;

  // ── Phase 3: type generate command ────────────────────────
  timers.push(setTimeout(() => { phase.value = "gen-typing"; }, jsonDone));
  GEN_CMD.split("").forEach((char, i) => {
    timers.push(setTimeout(() => { typedGenerate.value += char; }, jsonDone + i * C));
  });

  const genDone = jsonDone + GEN_CMD.length * C + 260;

  // ── Phase 4: stream generate output ───────────────────────
  timers.push(setTimeout(() => { phase.value = "gen-out"; }, genDone));
  OUTPUT_LINES.forEach((_, i) => {
    timers.push(
      setTimeout(
        () => { visibleLines.value = [...visibleLines.value, i]; },
        genDone + i * 148,
      ),
    );
  });

  const allDone = genDone + OUTPUT_LINES.length * 148;

  timers.push(setTimeout(() => { phase.value = "done"; }, allDone));
  timers.push(setTimeout(() => { showFiles.value = true; }, allDone + 260));
}

function jsonLineColor(line: string): string {
  if (line.startsWith("{") || line.startsWith("}") || line.includes("]")) return "text-[#555]";
  if (line.includes('"service"') || line.includes('"endpoints"') || line.includes('"path"') || line.includes('"method"') || line.includes('"response"')) return "text-[#9abf00]";
  return "text-[#d2ff00]";
}

onMounted(() => {
  if (!root.value) return;
  const DELAY = 2500;
  const TICK = 100;

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting || phase.value !== "idle") return;
      observer?.disconnect();

      autoRunCountdown.value = DELAY;
      countdownInterval = setInterval(() => {
        autoRunCountdown.value = Math.max(0, autoRunCountdown.value - TICK);
      }, TICK);

      autoRunTimer = setTimeout(() => {
        cancelAutoRun();
        run();
      }, DELAY);
    },
    { threshold: 0.35 },
  );
  observer.observe(root.value);
});

onUnmounted(() => {
  clearTimers();
  cancelAutoRun();
  observer?.disconnect();
});
</script>

<template>
  <div ref="root" class="space-y-4">
    <!-- Terminal -->
    <div
      class="overflow-hidden border border-[#1f1f1f] bg-[#070707] shadow-card"
    >
      <div
        class="flex items-center justify-between border-b border-[#1a1a1a] bg-[#0d0d0d] px-4 py-2.5"
      >
        <div class="flex items-center gap-1.5">
          <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span class="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span class="h-3 w-3 rounded-full bg-[#28c840]" />
          <span class="ml-2 font-mono text-xs text-[#444]">bash</span>
        </div>
        <div class="flex items-center gap-3">
          <span
            v-if="autoRunCountdown > 0"
            class="font-mono text-[10px] text-[#555]"
          >auto {{ (autoRunCountdown / 1000).toFixed(1) }}s</span>
          <button
            type="button"
            :disabled="phase !== 'idle' && phase !== 'done'"
            :class="[
              'inline-flex items-center border border-accent bg-accent px-3 py-1 text-xs font-semibold text-[#1f1f1f] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60',
              phase === 'idle' ? 'btn-glow' : '',
            ]"
            @click="phase === 'done' ? reset() : run()"
          >
            {{
              phase === 'idle' ? runLabel :
              phase === 'done' ? replayLabel :
              runningLabel
            }}
          </button>
        </div>
      </div>

      <div class="min-h-56 p-5 font-mono text-sm leading-relaxed">
        <!-- Idle prompt -->
        <div v-if="phase === 'idle'" class="flex items-center gap-2">
          <span class="text-[#d2ff00]">$</span>
          <span class="inline-block h-[1em] w-0.5 animate-pulse bg-[#d2ff00]" />
        </div>

        <!-- cat command typing -->
        <div v-if="typedCat" class="flex items-center gap-2">
          <span class="text-[#d2ff00]">$</span>
          <span class="text-[#888]">{{ typedCat }}</span>
          <span
            v-if="phase === 'cat-typing'"
            class="inline-block h-[1em] w-0.5 animate-pulse bg-[#888]"
          />
        </div>

        <!-- JSON output -->
        <div v-if="visibleJsonLines.length" class="mt-0.5 space-y-0">
          <div
            v-for="(line, i) in JSON_LINES"
            :key="i"
            :class="['font-mono text-xs leading-snug whitespace-pre', visibleJsonLines.includes(i) ? 'block' : 'hidden', jsonLineColor(line)]"
          >{{ line }}</div>
        </div>

        <!-- generate command typing -->
        <div
          v-if="phase === 'gen-typing' || phase === 'gen-out' || phase === 'done'"
          class="mt-1 flex items-center gap-2"
        >
          <span class="text-[#d2ff00]">$</span>
          <span class="text-white">{{ typedGenerate }}</span>
          <span
            v-if="phase === 'gen-typing'"
            class="inline-block h-[1em] w-0.5 animate-pulse bg-white"
          />
        </div>

        <!-- generate output lines streaming in -->
        <div class="mt-1 space-y-0.5">
          <div
            v-for="(line, i) in OUTPUT_LINES"
            :key="i"
            :class="[
              'font-mono text-sm',
              visibleLines.includes(i) ? 'block' : 'hidden',
              line.type === 'success'
                ? 'text-[#d2ff00]'
                : line.type === 'file'
                  ? 'pl-2 text-[#9abf00]'
                  : line.type === 'done'
                    ? 'font-semibold text-white'
                    : 'text-[#888]',
            ]"
          >{{ line.text }}</div>
        </div>
      </div>
    </div>

    <!-- Generated files grid -->
    <div
      v-if="showFiles"
      class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(file, i) in GENERATED_FILES"
        :key="file.name"
        class="file-card overflow-hidden border border-[#1f1f1f] bg-[#070707] shadow-card"
        :style="{ '--delay': `${i * 55}ms` }"
      >
        <div
          class="flex items-center justify-between border-b border-[#1a1a1a] bg-[#0d0d0d] px-3 py-2"
        >
          <span class="truncate font-mono text-xs text-[#666]">{{
            file.name
          }}</span>
          <span
            class="ml-2 shrink-0 font-mono text-[10px] font-semibold tracking-wider text-accent"
            >{{ file.lang }}</span
          >
        </div>
        <pre
          class="overflow-hidden p-3 text-[11px] leading-relaxed text-[#9abf00]"
          ><code>{{ file.lines.join("\n") }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-card {
  animation: reveal-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes btn-glow {
  0%, 100% { box-shadow: 0 0 6px 1px rgba(210, 255, 0, 0.25); }
  50% { box-shadow: 0 0 18px 5px rgba(210, 255, 0, 0.55); }
}

.btn-glow {
  animation: btn-glow 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .btn-glow { animation: none; }
}
</style>

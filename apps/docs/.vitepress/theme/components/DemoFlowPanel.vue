<script setup lang="ts">
import { ref, onUnmounted } from "vue";

defineProps<{
  runLabel: string;
  runningLabel: string;
  replayLabel: string;
}>();

const COMMAND = "contract-kit generate";

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

const typedCommand = ref("");
const visibleLines = ref<number[]>([]);
const showCursor = ref(false);
const isRunning = ref(false);
const isCompleted = ref(false);
const showFiles = ref(false);

let timers: ReturnType<typeof setTimeout>[] = [];

function clearTimers(): void {
  timers.forEach(clearTimeout);
  timers = [];
}

function reset(): void {
  clearTimers();
  typedCommand.value = "";
  visibleLines.value = [];
  showCursor.value = false;
  isRunning.value = false;
  isCompleted.value = false;
  showFiles.value = false;
}

function run(): void {
  if (isRunning.value) return;
  reset();
  isRunning.value = true;
  showCursor.value = true;

  const chars = COMMAND.split("");
  const charDelay = 48;

  chars.forEach((char, i) => {
    timers.push(
      setTimeout(() => {
        typedCommand.value += char;
      }, i * charDelay),
    );
  });

  const commandDone = chars.length * charDelay + 280;

  timers.push(
    setTimeout(() => {
      showCursor.value = false;
    }, commandDone - 100),
  );

  OUTPUT_LINES.forEach((_, i) => {
    timers.push(
      setTimeout(() => {
        visibleLines.value = [...visibleLines.value, i];
      }, commandDone + i * 165),
    );
  });

  const allDone = commandDone + OUTPUT_LINES.length * 165;

  timers.push(
    setTimeout(() => {
      isRunning.value = false;
      isCompleted.value = true;
    }, allDone),
  );

  timers.push(
    setTimeout(() => {
      showFiles.value = true;
    }, allDone + 260),
  );
}

onUnmounted(clearTimers);
</script>

<template>
  <div class="space-y-4">
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
        <button
          type="button"
          :disabled="isRunning"
          class="inline-flex items-center border border-accent bg-accent px-3 py-1 text-xs font-semibold text-[#1f1f1f] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          @click="isCompleted ? reset() : run()"
        >
          {{ isRunning ? runningLabel : isCompleted ? replayLabel : runLabel }}
        </button>
      </div>

      <div class="min-h-56 p-5 font-mono text-sm leading-relaxed">
        <!-- Idle prompt -->
        <div
          v-if="!typedCommand && !isCompleted"
          class="flex items-center gap-2"
        >
          <span class="text-[#d2ff00]">$</span>
          <span
            class="inline-block h-[1em] w-0.5 animate-pulse bg-[#d2ff00]"
          />
        </div>

        <!-- Command being typed -->
        <div v-if="typedCommand" class="flex items-center gap-2">
          <span class="text-[#d2ff00]">$</span>
          <span class="text-white">{{ typedCommand }}</span>
          <span
            v-if="showCursor"
            class="inline-block h-[1em] w-0.5 animate-pulse bg-white"
          />
        </div>

        <!-- Output lines streaming in -->
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
          >
            {{ line.text }}
          </div>
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
</style>

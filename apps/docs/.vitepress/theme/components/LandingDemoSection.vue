<script setup lang="ts">
import { useReveal } from "../composables/useReveal";
import DemoFlowPanel from "./DemoFlowPanel.vue";

defineProps<{
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
}>();

const titleRef = useReveal(0);
const descriptionRef = useReveal(70);
const cardLeftRef = useReveal(100);
const cardRightRef = useReveal(160);
const panelRef = useReveal(220);
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
        ref="cardLeftRef"
        class="reveal landing-card min-w-0 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707]"
      >
        <h3 class="font-heading text-lg text-[color:var(--vp-c-text-1)]">
          {{ valueTitle }}
        </h3>
        <ul class="mt-2 space-y-2 text-[color:var(--vp-c-text-2)]">
          <li v-for="item in valueItems" :key="item" class="flex items-start gap-2">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
            <span class="min-w-0 break-words">{{ item }}</span>
          </li>
        </ul>
      </article>

      <article
        ref="cardRightRef"
        class="reveal landing-card min-w-0 border border-[color:var(--vp-c-bg-alt)] bg-[color:var(--vp-c-bg-soft)] p-4 shadow-card dark:border-[#1f1f1f] dark:bg-[#070707]"
      >
        <h3 class="font-heading text-lg text-[color:var(--vp-c-text-1)]">
          {{ outputTitle }}
        </h3>
        <ul class="mt-2 space-y-2 text-[color:var(--vp-c-text-2)]">
          <li v-for="item in outputItems" :key="item" class="flex items-start gap-2">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
            <span class="min-w-0 break-words">{{ item }}</span>
          </li>
        </ul>
      </article>
    </div>

    <div ref="panelRef" class="reveal">
      <DemoFlowPanel
        :contract-label="contractLabel"
        :core-label="coreLabel"
        :generator-ts-label="generatorTsLabel"
        :angular-label="angularLabel"
        :nest-label="nestLabel"
        :zod-label="zodLabel"
        :mock-label="mockLabel"
        :diff-label="diffLabel"
        :cli-label="cliLabel"
        :generate-badge="generateBadge"
        :flow-title="flowTitle"
        :flow-description="flowDescription"
        :run-label="runLabel"
        :running-label="runningLabel"
        :replay-label="replayLabel"
        :contract-step="contractStep"
        :engine-step="engineStep"
        :output-step="outputStep"
      />
    </div>
  </section>
</template>

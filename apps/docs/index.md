---
layout: home

hero:
  name: ngx-contract-kit
  text: Ship Angular + backend APIs with one contract
  tagline: Contract-first toolkit to generate typed clients, runtime-safe backend wiring, and release guards against breaking changes.
  actions:
    - theme: brand
      text: Start in 5 minutes
      link: /quickstart
    - theme: alt
      text: Explore Architecture
      link: /architecture
    - theme: alt
      text: View Demo Flow
      link: /demo

features:
  - title: Contract Once, Use Everywhere
    details: Define endpoint metadata a single time and consume it across frontend, backend, tests, and CI.
  - title: Angular + Nest Focused
    details: Built for teams shipping Angular frontends and Node backends without duplicated API types.
  - title: Release Confidence
    details: Detect endpoint removals before merge and stop accidental breaking API releases.
---

<div class="landing-grid mt-8">
  <div class="landing-panel">
    <p class="landing-kicker">PROBLEM</p>
    <h3 class="landing-title">Frontend and backend drift over time</h3>
    <p class="landing-copy">Teams duplicate DTOs, clients, and docs by hand. API changes slip through review and break apps late.</p>
  </div>
  <div class="landing-panel">
    <p class="landing-kicker">SOLUTION</p>
    <h3 class="landing-title">A contract-first pipeline</h3>
    <p class="landing-copy">Generate types, client code, and compatibility checks from the same source so every layer stays aligned.</p>
  </div>
  <div class="landing-panel">
    <p class="landing-kicker">STATUS</p>
    <h3 class="landing-title">Early OSS, already runnable</h3>
    <p class="landing-copy">Current MVP ships CLI commands for init, generate, and check with strict TypeScript core validation.</p>
  </div>
</div>

## What you get

<div class="landing-grid">
  <div class="landing-panel">
    <p class="landing-kicker">CLI</p>
    <p class="landing-copy">`init`, `generate`, `check` commands to bootstrap contracts and enforce compatibility.</p>
  </div>
  <div class="landing-panel">
    <p class="landing-kicker">CORE</p>
    <p class="landing-copy">Strict contract validation with deterministic endpoint summary generation.</p>
  </div>
  <div class="landing-panel">
    <p class="landing-kicker">ROADMAP</p>
    <p class="landing-copy">Angular client generator, richer schema support, and backend plugins are next.</p>
  </div>
</div>

## End-to-end flow

1. Define contract files in `contracts/*.contract.json`.
2. Run code generation for typed artifacts.
3. Wire generated outputs into Angular and backend layers.
4. Run contract checks to catch breaking changes before release.

```bash
pnpm ckit:init
pnpm ckit:generate
pnpm ckit:check
```

<div class="mt-8 flex flex-wrap gap-3">
  <a class="VPButton brand" href="/quickstart">Quickstart</a>
  <a class="VPButton alt" href="/demo">Demo</a>
  <a class="VPButton alt" href="/architecture">Architecture</a>
  <a class="VPButton alt" href="https://github.com/Fr4n0m/ngx-contract-kit">GitHub</a>
</div>

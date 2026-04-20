---
layout: home

hero:
  name: ngx-contract-kit
  text: Contract-first toolkit for Angular + backend
  tagline: Define your API once. Generate Angular clients, backend validators, mocks, and CI compatibility checks.
  actions:
    - theme: brand
      text: View Demo Flow
      link: /demo
    - theme: alt
      text: Quickstart
      link: /quickstart

features:
  - title: Single Source of Truth
    details: Define API contracts once and keep frontend and backend in sync.
  - title: Angular + Backend Ready
    details: Generate Angular HttpClient clients and integrate with NestJS first.
  - title: Safer Releases
    details: Detect breaking API changes in CI before they reach production.
---

<div class="mt-8 grid gap-4 md:grid-cols-3">
  <div class="rounded-2xl border border-brand-200 bg-white/90 p-5 shadow-card">
    <p class="font-heading text-sm uppercase tracking-wide text-brand-700">DX</p>
    <p class="mt-2 text-slate-700">Start fast with `init`, keep contracts readable, and generate code in seconds.</p>
  </div>
  <div class="rounded-2xl border border-brand-200 bg-white/90 p-5 shadow-card">
    <p class="font-heading text-sm uppercase tracking-wide text-brand-700">Reliability</p>
    <p class="mt-2 text-slate-700">Block incompatible API changes before merge with contract diff checks in CI.</p>
  </div>
  <div class="rounded-2xl border border-brand-200 bg-white/90 p-5 shadow-card">
    <p class="font-heading text-sm uppercase tracking-wide text-brand-700">Open Source</p>
    <p class="mt-2 text-slate-700">Designed for contributors: modular packages, clear ADRs, and explicit release process.</p>
  </div>
</div>

## End-to-end Flow

1. Define a contract once in `.contract.ts`.
2. Generate shared types and Angular client.
3. Validate input/output on NestJS endpoints.
4. Generate mocks for unit and e2e tests.
5. Run contract compatibility checks in CI.

<div class="mt-8 flex flex-wrap gap-3">
  <a class="VPButton brand" href="/quickstart">Get started</a>
  <a class="VPButton alt" href="/roadmap">See roadmap</a>
  <a class="VPButton alt" href="https://github.com/your-org/ngx-contract-kit">GitHub repo</a>
</div>

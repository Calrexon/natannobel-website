---
title: Why I Switched to Bun and Never Looked Back
description: "Node was fine. Deno was interesting. But Bun? Bun feels like the runtime I've always wanted — and here's why."
date: 2024-11-12
author: Natan Nobel
category: Runtime
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80
---

I've been a JavaScript developer for a while, and I've used every runtime under the sun. Node.js was my first love — reliable, battle-tested, with an ecosystem that could solve any problem if you were willing to wade through enough npm packages.

Then Deno came along with its promises of security, native TypeScript, and a standard library that didn't feel like it was assembled from duct tape and prayers. I liked it. But adoption was slow, and the ecosystem gap was real.

## Enter Bun

Bun isn't just fast — it's *offensively* fast. The first time I ran `bun install` on a project that normally took 45 seconds with npm, it finished in under 3. I thought I'd done something wrong.

But speed is just the surface. What I actually fell in love with is the DX. Bun ships with a test runner, a bundler, a package manager, and a runtime — all in one binary.

## The Real Selling Point: ElysiaJS

The Bun ecosystem has been quietly building something special. ElysiaJS is the fastest HTTP framework I've ever used, and the end-to-end type safety feels almost magical.

```js
import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/health', () => ({ status: 'ok' }))
  .listen(3000)
```

For greenfield projects, Bun is my default. Give it a shot.

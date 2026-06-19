---
title: Hello World
description: First post on my new SvelteKit blog
pubDatetime: 2025-06-19
tags:
  - meta
  - sveltekit
---

# Hello World

Welcome to my new blog, built with **SvelteKit**, **Biome**, and **Bun**.

## Why SvelteKit?

- Blazing fast with zero runtime overhead
- File-based routing that just works
- Reactive by design with Svelte 5 runes

## Code example

```svelte
<script lang="ts">
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Clicks: {count}
</button>
```

## Math example

Inline: $E = mc^2$

Block:

$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

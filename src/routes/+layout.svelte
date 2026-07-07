<script lang="ts">
import { onNavigate } from '$app/navigation';
import Footer from '$lib/components/layout/Footer/Footer.svelte';
import Header from '$lib/components/layout/Header/Header.svelte';
import cfg from '$lib/config';
import '../styles/global.scss';
import '$lib/design-system/foundations/prose.module.scss';
import '$lib/design-system/foundations/code.module.scss';
import { viewTransition } from './viewTransition';

let { children } = $props();

onNavigate(viewTransition);
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="{cfg.site.title} RSS" href="/rss.xml" />
  <link rel="sitemap" href="/sitemap.xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Sriracha&family=Borel&display=swap" rel="stylesheet" />
</svelte:head>

<Header />
<main id="main-content">{@render children()}</main>
<Footer />

<svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0; pointer-events: none;" aria-hidden="true">
  <defs>
    <filter id="pencil-wiggle">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise">
        <animate attributeName="seed" values="1;2;3;4;1" dur="1s" repeatCount="indefinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>

<style>
  main { max-width: var(--mw); margin: 0 auto; width: 100%; padding: 0 var(--space-md) var(--space-md); flex: 1; }
</style>

<script lang="ts">
import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment';
import { onNavigate } from '$app/navigation';
import Footer from '$lib/components/layout/Footer/Footer.svelte';
import Header from '$lib/components/layout/Header/Header.svelte';
import Lightbox from '$lib/components/ui/Lightbox/Lightbox.svelte';
import Toaster from '$lib/components/ui/Toaster/Toaster.svelte';
import cfg from '$lib/config';
import '../styles/global.scss';
import '$lib/design-system/foundations/prose.scss';
import '$lib/design-system/foundations/code.scss';
import { viewTransition } from './viewTransition';

let { children } = $props();

injectAnalytics({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();
onNavigate(viewTransition);
</script>

<Toaster />
<Lightbox />

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="{cfg.site.title} RSS" href="/rss.xml" />
  <link rel="sitemap" href="/sitemap.xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <!--
    Sriracha + Borel: Google CSS already ships /* vietnamese */ unicode-range subsets.
    Do not strip subsets. Handwriting irregularity = glyphs in the font, not DOM spans.
  -->
  <link
    href="https://fonts.googleapis.com/css2?family=Sriracha&family=Borel&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Header />
<main id="main-content">{@render children()}</main>
<Footer />

<!--
  Pencil wiggle: animated turbulence seed.
  Consumers MUST use .pencil-edge (own compositor layer) so re-filter stays on that box,
  not the scrolling document.
-->
<svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0; pointer-events: none;" aria-hidden="true">
  <defs>
    <filter id="pencil-wiggle" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="1" result="noise">
        <animate attributeName="seed" values="1;3;5;7;2;6;4;1" dur="1.5s" repeatCount="indefinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <!-- Static twin for prefers-reduced-motion (no seed churn) -->
    <filter id="pencil-edge-static" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>

<style>
  main { max-width: var(--mw); margin: 0 auto; width: 100%; padding: 0 var(--space-md) var(--space-md); flex: 1; }
</style>

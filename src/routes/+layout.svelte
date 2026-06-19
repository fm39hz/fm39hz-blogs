<script lang="ts">
import { onNavigate } from '$app/navigation';
import Footer from '$lib/components/layout/Footer/Footer.svelte';
import Header from '$lib/components/layout/Header/Header.svelte';
import cfg from '$lib/config';
import '../styles/global.module.scss';
import '$lib/design-system/foundations/prose.module.scss';
import '$lib/design-system/foundations/code.module.scss';
import { viewTransition } from './viewTransition';

let { children } = $props();

onNavigate(viewTransition);
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="{cfg.site.title} RSS" href="/rss.xml" />
  <link rel="sitemap" href="/sitemap.xml" />
</svelte:head>

<Header />
<main id="main-content">{@render children()}</main>
<Footer />

<style>
  main { max-width: var(--mw); margin: 0 auto; width: 100%; padding: 0 var(--space-md) var(--space-md); flex: 1; }
</style>

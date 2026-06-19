<script lang="ts">
import cfg from '$lib/config';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import '../styles/global.scss';

let { children } = $props();
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="{cfg.site.title} RSS" href="/rss.xml" />
  <link rel="sitemap" href="/sitemap.xml" />
</svelte:head>

<Header />
<main id="main-content">{@render children()}</main>
<Footer />

<style>
  main { max-width: 48rem; margin: 0 auto; width: 100%; padding: 0 1rem 1rem; flex: 1; }
</style>

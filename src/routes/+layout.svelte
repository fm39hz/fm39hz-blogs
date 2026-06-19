<script lang="ts">
import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
import '../app.css';

let { children } = $props();
</script>

<svelte:head>
	<meta name="generator" content="SvelteKit" />
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
	<link rel="sitemap" href="/sitemap.xml" />
</svelte:head>

<Header />
<main id="main-content" class="app-layout pb-4 flex-1">
	{@render children()}
</main>
<Footer />

<script lang="ts">
import { inject as injectAnalytics, pageview } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { browser, dev } from '$app/env';
import { afterNavigate, onNavigate } from '$app/navigation';
import Footer from '$lib/components/layout/Footer/Footer.svelte';
import Header from '$lib/components/layout/Header/Header.svelte';
import Lightbox from '$lib/components/ui/Lightbox/Lightbox.svelte';
import Toaster from '$lib/components/ui/Toaster/Toaster.svelte';
import cfg from '$lib/config';
import PencilFilters from '$lib/design-system/primitives/PencilFilters.svelte';
import {
	FONT_CSS_ORIGIN,
	FONT_FILE_ORIGIN,
	SITE_FONT_STYLESHEET,
} from '$lib/design-system/tokens/fonts';
// KaTeX CSS from the installed package: version always matches the renderer.
import 'katex/dist/katex.min.css';
import '../styles/global.scss';
import '$lib/design-system/foundations/prose.scss';
import '$lib/design-system/foundations/code.scss';
import { setRootLocale } from '$lib/document/root';
import { locale } from '$lib/i18n-state.svelte';
import { getTextDirection } from '$lib/paraglide/runtime';
import styles from './+layout.module.scss';
import { viewTransition } from './viewTransition';

let { children } = $props();

$effect(() => {
	if (!browser) return;
	setRootLocale(locale.value, getTextDirection(locale.value));
});

if (browser) {
	const basePath = import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH;
	injectAnalytics(
		{
			mode: dev ? 'development' : 'production',
			basePath,
			disableAutoTrack: true,
			framework: 'sveltekit',
		},
		import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG,
	);
	const speedInsights = injectSpeedInsights({
		basePath,
		framework: 'sveltekit',
	});

	afterNavigate(({ to }) => {
		const route = to?.route.id;
		if (!route) return;
		pageview({ route, path: to.url.pathname });
		speedInsights?.setRoute(route);
	});
}
onNavigate(viewTransition);
</script>

<Toaster />
<Lightbox />

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="{cfg.site.title} RSS" href="/rss.xml" />
  <link rel="sitemap" href="/sitemap.xml" />
  <link rel="preconnect" href={FONT_CSS_ORIGIN} />
  <link rel="preconnect" href={FONT_FILE_ORIGIN} crossorigin="anonymous" />
  <link href={SITE_FONT_STYLESHEET} rel="stylesheet" />
</svelte:head>

<Header locale={locale.value} />
<main id="main-content" class={styles.main}>{@render children()}</main>
<Footer locale={locale.value} />

<PencilFilters />


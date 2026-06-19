<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';

const t = useTranslations();
</script>

<svelte:head>
	<title>{t.pages.searchTitle} | {cfg.site.title}</title>
	<meta name="description" content={t.pages.searchDesc} />
</svelte:head>

<section class="py-8">
	<h1 class="text-2xl font-semibold sm:text-3xl">{t.pages.searchTitle}</h1>
	<p class="mt-2 mb-6 italic text-muted-foreground">{t.pages.searchDesc}</p>
	<p class="text-muted-foreground">Search coming soon.</p>
</section>

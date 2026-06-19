<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';

const t = useTranslations();
</script>

<svelte:head>
  <title>{t.pages.searchTitle} | {cfg.site.title}</title>
  <meta name="description" content={t.pages.searchDesc} />
</svelte:head>

<section>
  <h1>{t.pages.searchTitle}</h1>
  <p class="desc">{t.pages.searchDesc}</p>
  <p class="placeholder">Search coming soon.</p>
</section>

<style>
  section { padding: 2rem 0; }
  h1 { font-size: 1.5rem; font-weight: 600; margin: 0; }
  .desc { margin-top: 0.5rem; margin-bottom: 1.5rem; font-style: italic; color: var(--muted-fg); }
  .placeholder { color: var(--muted-fg); }
</style>

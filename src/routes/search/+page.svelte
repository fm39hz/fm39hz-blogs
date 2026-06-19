<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import styles from './+page.module.scss';

const t = useTranslations();
</script>

<svelte:head><title>{t.pages.searchTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.searchDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.searchTitle}</h1>
  <p class={styles.desc}>{t.pages.searchDesc}</p>
  <p>Search coming soon.</p>
</section>

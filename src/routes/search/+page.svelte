<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
</script>

<svelte:head><title>{t.pages.searchTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.searchDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.searchTitle}</h1>
  <p class={styles.desc}>{t.pages.searchDesc}</p>
  <p>{t.pages.searchComingSoon}</p>
</section>

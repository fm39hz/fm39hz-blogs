<script lang="ts">
import Icon from '@iconify/svelte';
import PostCard from '$lib/components/ui/PostCard/PostCard.svelte';
import Socials from '$lib/components/ui/Socials/Socials.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { getLocalizedPath } from '$lib/utils/localized-url';
import styles from './+page.module.scss';

let {
	data,
}: {
	data: {
		featured: import('$lib/content/types').ArticleCard[];
		recent: import('$lib/content/types').ArticleCard[];
	};
} = $props();
let t = $derived(useTranslations(locale.value));
</script>

<svelte:head><title>{cfg.site.title}</title><meta name="description" content={t.pages.siteDescription} /></svelte:head>

<section class={styles.hero}>
  <h1 class={styles.h1}>{t.home.heroTitle}</h1>
  <a href="/rss.xml" class={styles.rss} aria-label={t.a11y.rssFeed} title={t.a11y.rssFeed}><Icon icon="ph:rss" class="rss-icon" /></a>
  <p class={styles.tagline}>{t.home.heroTagline}</p>
  {#if cfg.socials.length > 0}
    <div class={styles.socialRow}><span>{t.home.socialLinks}:</span><Socials /></div>
  {/if}
</section>

  {#if data.featured.length > 0}
  <section class={styles.section}>
    <h2>{t.home.featured}</h2>
    <ul>{#each data.featured as post}<li><PostCard {post} /></li>{/each}</ul>
  </section>
{/if}

  {#if data.recent.length > 0}
  <section class={styles.section}>
    <h2>{t.home.recentPosts}</h2>
    <ul>{#each data.recent.slice(0, cfg.posts.perIndex) as post}<li><PostCard {post} /></li>{/each}</ul>
  </section>
{/if}

<div class={styles.allPosts}><a href={getLocalizedPath('/articles', locale.value)}>{t.home.allPosts} <Icon icon="ph:arrow-right" class={styles.arrow} /></a></div>

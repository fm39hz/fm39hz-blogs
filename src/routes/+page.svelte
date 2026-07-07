<script lang="ts">
import Icon from '@iconify/svelte';
import PostCard from '$lib/components/ui/PostCard/PostCard.svelte';
import Socials from '$lib/components/ui/Socials/Socials.svelte';
import cfg from '$lib/config';
import { loadPosts } from '$lib/data/server';
import { useTranslations } from '$lib/i18n';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';
import styles from './+page.module.scss';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const sortedPosts = getSortedPosts(displayPosts);
const featuredPosts = sortedPosts.filter((p) => p.metadata.featured);
const recentPosts = sortedPosts.filter((p) => !p.metadata.featured);
</script>

<svelte:head><title>{cfg.site.title}</title><meta name="description" content={cfg.site.description} /></svelte:head>

<section class={styles.hero}>
  <h1 class={styles.h1}>{cfg.site.hero.title}</h1>
  <a href="/rss.xml" class={styles.rss} aria-label={t.a11y.rssFeed} title={t.a11y.rssFeed}><Icon icon="ph:rss" class="rss-icon" /></a>
  <p class={styles.tagline}>{cfg.site.hero.tagline}</p>
  {#if cfg.socials.length > 0}
    <div class={styles.socialRow}><span>{t.home.socialLinks}:</span><Socials /></div>
  {/if}
</section>

{#if featuredPosts.length > 0}
  <section class={styles.section}>
    <h2>{t.home.featured}</h2>
    <ul>{#each featuredPosts as post}<li><PostCard {post} /></li>{/each}</ul>
  </section>
{/if}

{#if recentPosts.length > 0}
  <section class={styles.section}>
    <h2>{t.home.recentPosts}</h2>
    <ul>{#each recentPosts.slice(0, cfg.posts.perIndex) as post}<li><PostCard {post} /></li>{/each}</ul>
  </section>
{/if}

<div class={styles.allPosts}><a href="/logs">{t.home.allPosts} &rarr;</a></div>

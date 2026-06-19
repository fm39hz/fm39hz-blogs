<script lang="ts">
import PostCard from '$lib/components/PostCard.svelte';
import Socials from '$lib/components/Socials.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { loadPosts } from '$lib/server';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';
import '../styles/pages/home.scss';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const sortedPosts = getSortedPosts(displayPosts);
const featuredPosts = sortedPosts.filter((p) => p.metadata.featured);
const recentPosts = sortedPosts.filter((p) => !p.metadata.featured);
</script>

<svelte:head>
  <title>{cfg.site.title}</title>
  <meta name="description" content={cfg.site.description} />
</svelte:head>

<section class="hero">
  <h1>{cfg.site.hero.title}</h1>
  <a href="/rss.xml" class="rss" aria-label={t.a11y.rssFeed} title={t.a11y.rssFeed}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg></a>
  <p>{cfg.site.hero.tagline}</p>
  {#if cfg.socials.length > 0}
    <div class="social-row"><span>{t.home.socialLinks}:</span><Socials /></div>
  {/if}
</section>

{#if featuredPosts.length > 0}
  <section class="section">
    <h2>{t.home.featured}</h2>
    <ul>{#each featuredPosts as post}<li><PostCard {post} /></li>{/each}</ul>
  </section>
{/if}

{#if recentPosts.length > 0}
  <section class="section">
    <h2>{t.home.recentPosts}</h2>
    <ul>{#each recentPosts.slice(0, cfg.posts.perIndex) as post}<li><PostCard {post} /></li>{/each}</ul>
  </section>
{/if}

<div class="all-posts"><a href="/posts">{t.home.allPosts} &rarr;</a></div>

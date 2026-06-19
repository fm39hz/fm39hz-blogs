<script lang="ts">
import PostCard from '$lib/components/PostCard.svelte';
import Socials from '$lib/components/Socials.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import Icon from '@iconify/svelte';
import { loadPosts } from '$lib/server';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';

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
	<meta name="title" content={cfg.site.title} />
	<meta name="description" content={cfg.site.description} />
	<meta name="author" content={cfg.site.author} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={cfg.site.title} />
	<meta property="og:title" content={cfg.site.title} />
	<meta property="og:description" content={cfg.site.description} />
	<meta property="og:url" content={cfg.site.url} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={cfg.site.title} />
	<meta property="twitter:description" content={cfg.site.description} />
</svelte:head>

<section id="hero" class="border-border border-b pt-8 pb-6">
	<h1 class="my-4 inline-block text-4xl font-bold sm:my-8 sm:text-5xl">{cfg.site.hero.title}</h1>
	<a target="_blank" href="/rss.xml" class="inline-block" aria-label="RSS Feed" title="RSS Feed">
		<Icon icon="ph:rss" class="size-5 text-accent" />
	</a>
	<p>{cfg.site.hero.tagline}</p>
	{#if cfg.socials.length > 0}
		<div class="mt-4 flex max-sm:flex-col sm:items-center">
			<div class="me-2 mb-1 whitespace-nowrap sm:mb-0">{t.home.socialLinks}:</div>
			<Socials />
		</div>
	{/if}
</section>

{#if featuredPosts.length > 0}
	<section id="featured" class="pt-12 pb-6 {recentPosts.length > 0 ? 'border-border border-b' : ''}">
		<h2 class="text-2xl font-semibold tracking-wide">{t.home.featured}</h2>
		<ul>
			{#each featuredPosts as post}
				<li class="my-6">
					<PostCard {post} />
				</li>
			{/each}
		</ul>
	</section>
{/if}

{#if recentPosts.length > 0}
	<section id="recent-posts" class="pt-12 pb-6">
		<h2 class="text-2xl font-semibold tracking-wide">{t.home.recentPosts}</h2>
		<ul>
			{#each recentPosts.slice(0, cfg.posts.perIndex) as post}
				<li class="my-6">
					<PostCard {post} />
				</li>
			{/each}
		</ul>
	</section>
{/if}

<div class="my-8 text-center">
	<a href="/posts" class="group inline-flex items-center gap-1 hover:text-accent">
		{t.home.allPosts}
		<Icon icon="ph:arrow-right" class="size-5" />
	</a>
</div>

<script lang="ts">
import PostCard from '$lib/components/PostCard.svelte';
import Socials from '$lib/components/Socials.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import type { PostMeta } from '$lib/types';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';

const t = useTranslations();

const modules = import.meta.glob<{ metadata: PostMeta }>('/src/content/posts/*.md', {
	eager: true,
});
const allPosts = Object.entries(modules).map(([path, mod]) => {
	const file = path.split('/').pop()!;
	const slug = file.replace(/\.(en|vi)\.md$/, '').replace(/\.md$/, '');
	return { slug, metadata: mod.metadata };
});
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
	<h1 class="my-4 inline-block text-4xl font-bold sm:my-8 sm:text-5xl">FM39hz's blog</h1>
	<a target="_blank" href="/rss.xml" class="inline-block" aria-label="RSS Feed" title="RSS Feed">
		<svg width="20" height="20" class="stroke-accent scale-125 stroke-3 rtl:-rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
	</a>
	<p>This is my personal blogs, to mumbling about Work & Life</p>
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
		<svg class="inline-block rtl:-rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
	</a>
</div>

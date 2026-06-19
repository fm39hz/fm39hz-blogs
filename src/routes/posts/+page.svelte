<script lang="ts">
import { page } from '$app/state';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { loadPosts } from '$lib/server';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const sorted = getSortedPosts(displayPosts);

const perPage = cfg.posts.perPage;
const totalPages = Math.ceil(sorted.length / perPage);
</script>

<svelte:head>
	<title>{t.pages.postsTitle} | {cfg.site.title}</title>
	<meta name="title" content="{t.pages.postsTitle} | {cfg.site.title}" />
	<meta name="description" content={t.pages.postsDesc} />
</svelte:head>

<section class="py-8">
	<h1 class="text-2xl font-semibold sm:text-3xl">{t.pages.postsTitle}</h1>
	<p class="mt-2 mb-6 italic text-muted-foreground">{t.pages.postsDesc}</p>
	<ul>
		{#each sorted.slice(0, perPage) as post}
			<li class="my-6">
				<a href="/posts/{post.slug}" class="text-accent inline-block text-lg font-medium decoration-dashed underline-offset-4 hover:underline focus-visible:no-underline">
					<h2>{post.metadata.title}</h2>
				</a>
				<p class="mt-1 text-muted-foreground">{post.metadata.description}</p>
			</li>
		{/each}
	</ul>
	{#if totalPages > 1}
		<nav class="mt-auto mb-8 flex justify-center gap-4" aria-label={t.a11y.paginationNav}>
			<a href="?page={2}" class="group inline-flex items-center gap-1 hover:text-accent" aria-label={t.a11y.goToNextPage}>
				{t.pagination.next}
				<svg class="inline-block rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
			</a>
		</nav>
	{/if}
</section>

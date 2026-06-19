<script lang="ts">
import { page } from '$app/state';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { loadPosts } from '$lib/server';
import { slugifyAll } from '$lib/tags';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const tagParam = decodeURIComponent(page.params.tag!);

const tagPosts = getSortedPosts(
	displayPosts.filter((p) => slugifyAll(p.metadata.tags).includes(tagParam)),
);
</script>

<svelte:head>
	<title>{t.pages.tagTitle}: {tagParam} | {cfg.site.title}</title>
	<meta name="description" content={`${t.pages.tagDesc} "${tagParam}".`} />
</svelte:head>

<section class="py-8">
	<h1 class="text-2xl font-semibold sm:text-3xl">{t.pages.tagTitle}: {tagParam}</h1>
	<p class="mt-2 mb-6 italic text-muted-foreground">{t.pages.tagDesc} "{tagParam}".</p>
	<ul>
		{#each tagPosts as post}
			<li class="my-6">
				<a href="/posts/{post.slug}" class="text-accent inline-block text-lg font-medium decoration-dashed underline-offset-4 hover:underline">
					<h2>{post.metadata.title}</h2>
				</a>
			</li>
		{/each}
	</ul>
</section>

<script lang="ts">
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
const sorted = getSortedPosts(displayPosts);

const years: Record<string, { month: number; posts: typeof sorted }[]> = {};
for (const post of sorted) {
	const d = new Date(post.metadata.pubDatetime);
	const y = String(d.getFullYear());
	const m = d.getMonth() + 1;
	if (!years[y]) years[y] = [];
	let monthGroup = years[y].find((g) => g.month === m);
	if (!monthGroup) {
		monthGroup = { month: m, posts: [] };
		years[y].push(monthGroup);
	}
	monthGroup.posts.push(post);
}
for (const y of Object.keys(years)) years[y].sort((a, b) => b.month - a.month);
const sortedYears = Object.entries(years).sort(([a], [b]) => Number(b) - Number(a));

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
</script>

<svelte:head>
	<title>{t.pages.archivesTitle} | {cfg.site.title}</title>
	<meta name="description" content={t.pages.archivesDesc} />
</svelte:head>

<section class="py-8">
	<h1 class="text-2xl font-semibold sm:text-3xl">{t.pages.archivesTitle}</h1>
	<p class="mt-2 mb-6 italic text-muted-foreground">{t.pages.archivesDesc}</p>

	{#each sortedYears as [year, monthGroups]}
		<div>
			<span class="text-2xl font-bold">{year}</span>
			<sup class="text-muted-foreground text-sm">
				{monthGroups.reduce((s, g) => s + g.posts.length, 0)}
			</sup>
			{#each monthGroups as { month, posts }}
				<div class="flex flex-col sm:flex-row">
					<div class="mt-6 min-w-36 text-lg sm:my-6">
						<span class="font-bold">{monthFormatter.format(new Date(2000, month - 1, 1))}</span>
						<sup class="text-muted-foreground text-xs">{posts.length}</sup>
					</div>
					<ul>
						{#each posts as post}
							<li class="my-6">
								<a href="/posts/{post.slug}" class="text-accent inline-block text-lg font-medium decoration-dashed underline-offset-4 hover:underline">
									{post.metadata.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/each}
</section>

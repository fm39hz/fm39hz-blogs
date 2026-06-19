<script lang="ts">
import Tag from '$lib/components/Tag.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { loadPosts } from '$lib/server';
import { getUniqueTags } from '$lib/tags';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const tags = getUniqueTags(displayPosts);
</script>

<svelte:head>
	<title>{t.pages.tagsTitle} | {cfg.site.title}</title>
	<meta name="description" content={t.pages.tagsDesc} />
</svelte:head>

<section class="py-8">
	<h1 class="text-2xl font-semibold sm:text-3xl">{t.pages.tagsTitle}</h1>
	<p class="mt-2 mb-6 italic text-muted-foreground">{t.pages.tagsDesc}</p>
	<ul class="flex flex-wrap gap-6">
		{#each tags as { tag, tagName }}
			<Tag {tag} {tagName} />
		{/each}
	</ul>
</section>

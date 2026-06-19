<script lang="ts">
import { page } from '$app/state';
import cfg from '$lib/config';
import { loadPosts } from '$lib/data/server';
import { useTranslations } from '$lib/i18n';
import { slugifyAll } from '$lib/tags';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';
import styles from './+page.module.scss';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const tagParam = decodeURIComponent(page.params.tag);
const tagPosts = getSortedPosts(
	displayPosts.filter((p) => slugifyAll(p.metadata.tags).includes(tagParam)),
);
</script>

<svelte:head><title>{t.pages.tagTitle}: {tagParam} | {cfg.site.title}</title><meta name="description" content={`${t.pages.tagDesc} "${tagParam}".`} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.tagTitle}: {tagParam}</h1>
  <p class={styles.desc}>{t.pages.tagDesc} "{tagParam}".</p>
  <ul class={styles.ul}>{#each tagPosts as post}<li class={styles.li}><a href="/posts/{post.slug}" class={styles.a}>{post.metadata.title}</a></li>{/each}</ul>
</section>

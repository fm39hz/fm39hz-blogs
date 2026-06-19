<script lang="ts">
import ContentEntry from '$lib/components/ui/ContentEntry/ContentEntry.svelte';
import cfg from '$lib/config';
import { loadPosts } from '$lib/data/server';
import { useTranslations } from '$lib/i18n';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';
import styles from './+page.module.scss';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const sorted = getSortedPosts(displayPosts);
const perPage = cfg.posts.perPage;
</script>

<svelte:head><title>{t.pages.postsTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.postsDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.postsTitle}</h1>
  <p class={styles.desc}>{t.pages.postsDesc}</p>
  {#each sorted.slice(0, perPage) as post}
    <ContentEntry {post} />
  {/each}
</section>

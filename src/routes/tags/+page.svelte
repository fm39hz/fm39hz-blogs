<script lang="ts">
import Tag from '$lib/components/ui/Tag/Tag.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { loadPosts } from '$lib/data/server';
import { getUniqueTags } from '$lib/tags';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';
import styles from './+page.module.scss';

const t = useTranslations();
const allPosts = loadPosts();
const groups = groupPostsBySlug(allPosts);
const displayPosts = groups.map((g) => g.defaultEntry);
const tags = getUniqueTags(displayPosts);
</script>

<svelte:head><title>{t.pages.tagsTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.tagsDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.tagsTitle}</h1>
  <p class={styles.desc}>{t.pages.tagsDesc}</p>
  <ul class={styles.ul}>{#each tags as { tag, tagName }}<Tag {tag} {tagName} />{/each}</ul>
</section>

<script lang="ts">
import TagLine from '$lib/components/ui/TagLine/TagLine.svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { getUniqueTags } from '$lib/tags';
import { getDisplaySortedPosts } from '$lib/utils';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
const displayPosts = getDisplaySortedPosts();
const tags = getUniqueTags(displayPosts);
</script>

<svelte:head><title>{t.pages.tagsTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.tagsDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.tagsTitle}</h1>
  <p class={styles.desc}>{t.pages.tagsDesc}</p>
  <ul class={styles.ul}>{#each tags as { tag, tagName }}<TagLine {tag} {tagName} />{/each}</ul>
</section>

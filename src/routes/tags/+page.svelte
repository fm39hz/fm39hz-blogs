<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { loadPosts } from '$lib/server';
import { getUniqueTags } from '$lib/tags';
import { getSortedPosts, groupPostsBySlug } from '$lib/utils';
import Tag from '$lib/components/Tag.svelte';

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

<section>
  <h1>{t.pages.tagsTitle}</h1>
  <p class="desc">{t.pages.tagsDesc}</p>
  <ul class="tags">
    {#each tags as { tag, tagName }}
      <Tag {tag} {tagName} />
    {/each}
  </ul>
</section>

<style>
  section { padding: 2rem 0; }
  h1 { font-size: 1.5rem; font-weight: 600; margin: 0; }
  .desc { margin-top: 0.5rem; margin-bottom: 1.5rem; font-style: italic; color: var(--muted-fg); }
  .tags { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 1.5rem; }
</style>

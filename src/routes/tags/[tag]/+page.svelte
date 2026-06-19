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
const tagParam = decodeURIComponent(page.params.tag);

const tagPosts = getSortedPosts(
	displayPosts.filter((p) => slugifyAll(p.metadata.tags).includes(tagParam)),
);
</script>

<svelte:head>
  <title>{t.pages.tagTitle}: {tagParam} | {cfg.site.title}</title>
  <meta name="description" content={`${t.pages.tagDesc} "${tagParam}".`} />
</svelte:head>

<section>
  <h1>{t.pages.tagTitle}: {tagParam}</h1>
  <p class="desc">{t.pages.tagDesc} "{tagParam}".</p>
  <ul>
    {#each tagPosts as post}
      <li>
        <a href="/posts/{post.slug}">
          <h2>{post.metadata.title}</h2>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  section { padding: 2rem 0; }
  h1 { font-size: 1.5rem; font-weight: 600; margin: 0; }
  .desc { margin-top: 0.5rem; margin-bottom: 1.5rem; font-style: italic; color: var(--muted-fg); }
  ul { list-style: none; padding: 0; }
  li { margin: 1.5rem 0; }
  a { color: var(--accent); font-size: 1.125rem; text-decoration: underline; text-decoration-style: dashed; }
  a:hover { text-decoration: underline; }
  h2 { margin: 0; font-size: inherit; display: inline; }
</style>

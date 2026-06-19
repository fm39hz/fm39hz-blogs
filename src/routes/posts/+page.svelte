<script lang="ts">
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
</script>

<svelte:head>
  <title>{t.pages.postsTitle} | {cfg.site.title}</title>
  <meta name="description" content={t.pages.postsDesc} />
</svelte:head>

<section>
  <h1>{t.pages.postsTitle}</h1>
  <p class="desc">{t.pages.postsDesc}</p>
  <ul>
    {#each sorted.slice(0, perPage) as post}
      <li>
        <a href="/posts/{post.slug}">
          <h2>{post.metadata.title}</h2>
        </a>
        <p>{post.metadata.description}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  section { padding: 2rem 0; }
  h1 { font-size: 1.5rem; font-weight: 600; margin: 0; }
  .desc { margin-top: 0.5rem; margin-bottom: 1.5rem; font-style: italic; color: var(--muted-fg); }
  ul { list-style: none; padding: 0; margin: 0; }
  li { margin: 1.5rem 0; }
  a { color: var(--accent); font-size: 1.125rem; font-weight: 500; text-decoration: underline; text-decoration-style: dashed; text-underline-offset: 4px; }
  a:hover { text-decoration: underline; }
  a:focus-visible { text-decoration: none; }
  h2 { margin: 0; font-size: inherit; font-weight: inherit; display: inline; }
  li p { margin-top: 0.25rem; color: var(--muted-fg); }

  @media (width >= 640px) {
    h1 { font-size: 1.875rem; }
  }
</style>

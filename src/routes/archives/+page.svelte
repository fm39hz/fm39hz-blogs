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

const years: Record<string, { month: number; posts: typeof sorted }[]> = {};
for (const post of sorted) {
  const d = new Date(post.metadata.pubDatetime);
  const y = String(d.getFullYear());
  const m = d.getMonth() + 1;
  if (!years[y]) years[y] = [];
  let mg = years[y].find(g => g.month === m);
  if (!mg) { mg = { month: m, posts: [] }; years[y].push(mg); }
  mg.posts.push(post);
}
for (const y of Object.keys(years)) years[y].sort((a, b) => b.month - a.month);
const sortedYears = Object.entries(years).sort(([a], [b]) => Number(b) - Number(a));

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
</script>

<svelte:head>
  <title>{t.pages.archivesTitle} | {cfg.site.title}</title>
  <meta name="description" content={t.pages.archivesDesc} />
</svelte:head>

<section>
  <h1>{t.pages.archivesTitle}</h1>
  <p class="desc">{t.pages.archivesDesc}</p>

  {#each sortedYears as [year, monthGroups]}
    <div class="year-group">
      <span class="year">{year}</span>
      <sup>{monthGroups.reduce((s, g) => s + g.posts.length, 0)}</sup>
      {#each monthGroups as { month, posts }}
        <div class="month-group">
          <div class="month-label">
            <span class="month-name">{monthFormatter.format(new Date(2000, month - 1, 1))}</span>
            <sup>{posts.length}</sup>
          </div>
          <ul>
            {#each posts as post}
              <li>
                <a href="/posts/{post.slug}">{post.metadata.title}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/each}
</section>

<style>
  section { padding: 2rem 0; }
  h1 { font-size: 1.5rem; font-weight: 600; margin: 0; }
  .desc { margin-top: 0.5rem; margin-bottom: 1.5rem; font-style: italic; color: var(--muted-fg); }
  .year { font-size: 1.5rem; font-weight: 700; }
  sup { color: var(--muted-fg); font-size: 0.875rem; margin-left: 0.25rem; }
  .year-group { margin-bottom: 1rem; }
  .month-group { display: flex; flex-direction: column; }
  .month-label { margin-top: 1.5rem; min-width: 9rem; font-size: 1.125rem; }
  .month-name { font-weight: 700; }
  ul { list-style: none; padding: 0; }
  li { margin: 1.5rem 0; }
  a { color: var(--accent); font-size: 1.125rem; font-weight: 500; text-decoration: underline; text-decoration-style: dashed; text-underline-offset: 4px; }

  @media (width >= 640px) {
    .month-group { flex-direction: row; }
    .month-label { margin-top: 1.5rem; }
  }
</style>

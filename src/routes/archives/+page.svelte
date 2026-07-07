<script lang="ts">
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

const years: Record<string, { month: number; posts: typeof sorted }[]> = {};
for (const post of sorted) {
	const d = new Date(post.metadata.pubDatetime);
	const y = String(d.getFullYear());
	const m = d.getMonth() + 1;
	if (!years[y]) years[y] = [];
	let mg = years[y].find((g) => g.month === m);
	if (!mg) {
		mg = { month: m, posts: [] };
		years[y].push(mg);
	}
	mg.posts.push(post);
}
for (const y of Object.keys(years)) years[y].sort((a, b) => b.month - a.month);
const sortedYears = Object.entries(years).sort(([a], [b]) => Number(b) - Number(a));
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
</script>

<svelte:head><title>{t.pages.archivesTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.archivesDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.archivesTitle}</h1>
  <p class={styles.desc}>{t.pages.archivesDesc}</p>
  {#each sortedYears as [year, monthGroups]}
    <div class={styles.yearGroup}>
      <div class={styles.yearHeader}>
        <span class={styles.yearNum}>{year}</span>
        <span class={styles.yearCount}>{monthGroups.reduce((s, g) => s + g.posts.length, 0)} logs</span>
      </div>
      {#each monthGroups as { month, posts }}
        <div class={styles.monthGroup}>
          <div class={styles.monthHeader}>
            <span class={styles.monthDot}></span>
            <span class={styles.monthName}>{monthFormatter.format(new Date(2000, month - 1, 1))}</span>
            <span class={styles.monthCount}>({posts.length})</span>
          </div>
          <ul class={styles.postList}>
            {#each posts as post}
              <li class={styles.postItem}><a href="/logs/{post.slug}">{post.metadata.title}</a></li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/each}
</section>

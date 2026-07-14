<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { getDisplaySortedPosts, groupPostsByYearAndMonth } from '$lib/utils';
import styles from './+page.module.scss';

let t = $derived(useTranslations(locale.value));
const sorted = getDisplaySortedPosts();

const sortedYears = groupPostsByYearAndMonth(sorted);
let monthFormatter = $derived(new Intl.DateTimeFormat(locale.value, { month: 'long' }));
</script>

<svelte:head><title>{t.pages.archivesTitle} | {cfg.site.title}</title><meta name="description" content={t.pages.archivesDesc} /></svelte:head>

<section>
  <h1 class={styles.h1}>{t.pages.archivesTitle}</h1>
  <p class={styles.desc}>{t.pages.archivesDesc}</p>
  {#each sortedYears as { year, monthGroups }}
    <div class={styles.yearGroup}>
      <div class={styles.yearHeader}>
        <span class={styles.yearNum}>{year}</span>
        <span class={styles.yearCount}>{t.post.logsCount(monthGroups.reduce((s, g) => s + g.posts.length, 0))}</span>
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
              <li class={styles.postItem}><a href="/articles/{post.slug}">{post.metadata.title}</a></li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/each}
</section>

<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { loadPosts } from '$lib/data/server';
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
  <ul class={styles.ul}>
    {#each sorted.slice(0, perPage) as post}
      <li class={styles.li}>
        <a href="/posts/{post.slug}" class={styles.a}><h2>{post.metadata.title}</h2></a>
        <p class={styles.p}>{post.metadata.description}</p>
      </li>
    {/each}
  </ul>
</section>

<script lang="ts">
import type { ArticleCard } from '$lib/content/types';
import { locale } from '$lib/i18n-state.svelte';
import { articlePath } from '$lib/utils/localized-url';
import ButtonLink from '../ButtonLink/ButtonLink.svelte';
import styles from './ContentEntry.module.scss';

let { post }: { post: ArticleCard } = $props();
</script>

<article class={styles.entry} lang={post.metadata.lang}>
  <h2 class={styles.titleWrap}>
    <ButtonLink href={articlePath(post.slug, post.metadata.lang)}>{post.metadata.title}</ButtonLink>
  </h2>
  <p class={styles.desc}>{post.metadata.description}</p>
</article>

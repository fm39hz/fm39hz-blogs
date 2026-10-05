<script lang="ts">
import { locale } from '$lib/i18n-state.svelte';
import { articlePath } from '$lib/utils/localized-url';
import ButtonLink from '../ButtonLink/ButtonLink.svelte';
import styles from './ContentEntry.module.scss';

let {
	post,
}: {
	post: {
		slug: string;
		metadata: {
			title: string;
			description: string;
			pubDatetime?: string;
			tags?: string[];
			lang?: string;
		};
	};
} = $props();
</script>

<article class={styles.entry} lang={post.metadata.lang}>
  <h2 class={styles.titleWrap}>
    <ButtonLink href={articlePath(post.slug, post.metadata.lang ?? locale.value)}>{post.metadata.title}</ButtonLink>
  </h2>
  <p class={styles.desc}>{post.metadata.description}</p>
</article>

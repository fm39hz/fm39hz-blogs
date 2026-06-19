<script lang="ts">
import ButtonLink from '../ButtonLink/ButtonLink.svelte';
import styles from './ContentEntry.module.scss';

let {
	post,
}: {
	post: {
		slug: string;
		metadata: { title: string; description: string; pubDatetime?: string; tags?: string[] };
	};
} = $props();
</script>

<article class={styles.entry}>
  <h2 class={styles.titleWrap}>
    <ButtonLink href="/posts/{post.slug}">{post.metadata.title}</ButtonLink>
  </h2>
  <p class={styles.desc}>{post.metadata.description}</p>
</article>

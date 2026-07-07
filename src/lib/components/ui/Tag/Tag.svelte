<script lang="ts">
import Icon from '@iconify/svelte';
import styles from './Tag.module.scss';

let { tag, tagName, size = 'lg' }: { tag: string; tagName: string; size?: 'sm' | 'lg' } = $props();
</script>

<li class={styles.tag}>
  <a href="/thesaurus/{tag}/" class={styles[size]}>
    <Icon icon="ph:tag" class={styles[size]} />
    {tagName}
  </a>
</li>

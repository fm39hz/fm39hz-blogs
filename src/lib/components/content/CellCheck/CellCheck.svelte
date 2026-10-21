<script lang="ts">
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import type { CellCheckProps } from '../contract';
import styles from './CellCheck.module.scss';

/** `[x]` / `[/]` / `[ ]` in a table cell (rehypeTableCellCheckboxes). */
let { state }: CellCheckProps = $props();

let t = $derived(useTranslations(locale.value));
</script>

<svg class={styles.check} viewBox="0 0 24 24" role="img" aria-label={t.a11y.check[state]}>
  <circle class={styles.ring} cx="12" cy="12" r="10" />
  {#if state === 'done'}
    <path class={styles.mark} d="M7 12.5l3.5 3.5 6.5-7" pathLength="1" />
  {:else if state === 'partial'}
    <path class={styles.mark} d="M6 18L18 6" pathLength="1" />
  {/if}
</svg>

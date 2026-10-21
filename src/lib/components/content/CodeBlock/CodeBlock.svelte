<script lang="ts">
import CopyButton from '$lib/components/ui/CopyButton/CopyButton.svelte';
import type { CodeBlockProps } from '../contract';
import styles from './CodeBlock.module.scss';

/** Fenced code from the mdsvex highlighter (see contract.ts). */
let { html, source }: CodeBlockProps = $props();
</script>

<div class={styles.block}>
  {@html html}
  <CopyButton kind="code" pinned payload={{ text: source }} />
</div>

<script lang="ts">
import CopyButton from '$lib/components/ui/CopyButton/CopyButton.svelte';
import styles from './CodeBlock.module.scss';

/** Fenced code from the mdsvex highlighter: `html` is trusted Shiki output. */
let { html, source }: { html: string; source: string } = $props();
</script>

<div class={styles.block}>
  {@html html}
  <CopyButton kind="code" pinned payload={{ text: source }} />
</div>

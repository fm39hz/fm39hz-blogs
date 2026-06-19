<script lang="ts">
import type { Snippet } from 'svelte';
import { Lang } from '$lib/constants';
import { animateLangSwitch } from '$lib/animations/langTransition';

let { lang = Lang.EN, children }: { lang?: string; children?: Snippet<[]> } = $props();
let container: HTMLDivElement | undefined = $state();

$effect(() => {
	if (!container) return;
	animateLangSwitch(container, lang);
});
</script>

<div bind:this={container}>{@render children?.()}</div>

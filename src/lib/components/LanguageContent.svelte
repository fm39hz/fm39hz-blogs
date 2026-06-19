<script lang="ts">
import { animateLangSwitch } from '$lib/utils/langTransition';

let {
	lang = 'en',
	children,
}: {
	lang?: string;
	children?: any;
} = $props();

let ref: HTMLDivElement | undefined = $state();

$effect(() => {
	if (!ref) return;
	animateLangSwitch(ref, lang);
});
</script>

<div bind:this={ref}>
	{@render children?.()}
</div>

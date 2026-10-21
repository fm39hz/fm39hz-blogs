<script lang="ts">
import { generateIcon } from '@iconify/svelte/dist/offline-functions';

let props: { icon: string; class?: string } = $props();
const data = $derived(generateIcon(props));
</script>

{#if data?.svg}
	<svg {...data.attributes}>{@html data.body}</svg>
{:else if data}
	<span {...data.attributes}></span>
{/if}

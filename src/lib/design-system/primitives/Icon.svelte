<script lang="ts">
import OnlineIcon from '@iconify/svelte';
import { isBundledIcon } from './icons';
import OfflineIcon from './OfflineIcon.svelte';

let {
	icon,
	className = '',
	class: classAttribute = '',
	...rest
}: { icon: string; className?: string; class?: string; [key: string]: unknown } = $props();

const iconClass = $derived(className || classAttribute);
</script>

{#if isBundledIcon(icon)}
	<OfflineIcon {icon} class={iconClass} {...rest} />
{:else}
	<OnlineIcon {icon} class={iconClass} {...rest} />
{/if}

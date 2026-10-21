<script lang="ts">
import OnlineIcon from '@iconify/svelte';
import { isBundledIcon } from './icons';
import OfflineIcon from './OfflineIcon.svelte';

/** Iconify name (`ph:...`); bundled icons render offline. Size/colour come from `class`. */
let { icon, class: className = '' }: { icon: string; class?: string } = $props();
</script>

{#if isBundledIcon(icon)}
	<OfflineIcon {icon} class={className} />
{:else}
	<OnlineIcon {icon} class={className} />
{/if}

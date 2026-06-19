<script lang="ts">
import Iconify from '@iconify/svelte';

let {
	icon,
	className = '',
	...rest
}: { icon: string; className?: string; [key: string]: unknown } = $props();
</script>

<Iconify icon={icon} class={className} {...rest} />

<script lang="ts">
	import Icon from '@iconify/svelte';

	let { tag, tagName, size = 'lg' }: { tag: string; tagName: string; size?: 'sm' | 'lg' } = $props();
</script>

<li>
	<a
		href="/tags/{tag}/"
		class="flex items-center gap-0.5 border-foreground border-b-2 border-dashed hover:border-accent hover:text-accent hover:-mt-0.5 focus-visible:text-accent focus-visible:border-none {size === 'sm' ? 'text-sm' : 'text-lg'}"
	>
		<Icon icon="ph:tag" class="opacity-80 {size === 'lg' ? 'size-5' : 'size-4'}" />
		{tagName}
	</a>
</li>

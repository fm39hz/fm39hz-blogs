<script lang="ts">
	import cfg from '$lib/config';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-wrap items-center gap-1">
	{#each cfg.socials as { name, url, linkTitle }}
		<a
			href={url}
			class="group inline-flex items-center gap-1 p-2 hover:rotate-6 sm:p-1"
			title={linkTitle ?? `${cfg.site.title} on ${name.charAt(0).toUpperCase() + name.slice(1)}`}
		>
			<Icon icon="ph:{name === 'x' ? 'x-logo' : name === 'mail' ? 'envelope' : name === 'github' ? 'github-logo' : name === 'linkedin' ? 'linkedin-logo' : name}" class="size-6" />
		</a>
	{/each}
</div>

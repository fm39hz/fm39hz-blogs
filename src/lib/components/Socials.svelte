<script lang="ts">
import cfg, { socialIcons } from '$lib/config';
import Icon from '@iconify/svelte';

function iconFor(name: string): string {
	const link = cfg.socials.find(s => s.name === name);
	return link?.icon ?? socialIcons[name] ?? `ph:${name}`;
}
</script>

<div class="flex flex-wrap items-center gap-1">
	{#each cfg.socials as { name, url, linkTitle }}
		<a
			href={url}
			class="group inline-flex items-center gap-1 p-2 hover:rotate-6 sm:p-1"
			title={linkTitle ?? `${cfg.site.title} on ${name.charAt(0).toUpperCase() + name.slice(1)}`}
		>
			<Icon icon={iconFor(name)} class="size-6" />
		</a>
	{/each}
</div>

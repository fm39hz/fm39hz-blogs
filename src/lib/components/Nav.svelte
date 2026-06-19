<script lang="ts">
import { page } from '$app/state';
import { config } from '$lib/config';
import ThemeToggle from './ThemeToggle.svelte';

const _navItems = [
	{ label: 'Home', path: '/' },
	{ label: 'Blog', path: '/posts' },
	{ label: 'About', path: '/about' },
];
</script>

<nav class="border-b border-border">
	<div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
		<a href="/" class="text-lg font-bold tracking-tight hover:text-accent">
			{config.site.title}
		</a>
		<div class="flex items-center gap-6">
			{#each navItems as item}
				<a
					href={item.path}
					class="text-sm text-text-secondary transition-colors hover:text-accent {page.url.pathname === item.path ? 'text-accent font-medium' : ''}"
				>
					{item.label}
				</a>
			{/each}
			<ThemeToggle />
		</div>
	</div>
</nav>

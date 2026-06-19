<script lang="ts">
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { Collapsible } from 'melt/builders';
import Icon from '@iconify/svelte';
import Socials from './Socials.svelte';
import ThemeToggle from './ThemeToggle.svelte';

let { locale = 'en' }: { locale?: string } = $props();
const t = useTranslations(locale);
const menu = new Collapsible();
</script>

<a id="skip-to-content" href="#main-content" class="bg-background text-accent absolute inset-s-16 -top-full z-50 px-3 py-2 backdrop-blur-lg transition-all focus:top-4">
	{t.a11y.skipToContent}
</a>

<header class="app-layout flex flex-col items-center justify-between sm:flex-row">
	<div class="border-border bg-background relative flex w-full items-baseline justify-between border-b py-4 sm:items-center sm:py-6">
		<a href="/" class="absolute py-1 text-xl leading-8 font-semibold whitespace-nowrap sm:static sm:my-auto sm:text-2xl sm:leading-none">{cfg.site.title}</a>
		<nav id="nav-menu" class="flex w-full flex-col items-center sm:ms-2 sm:flex-row sm:justify-end sm:space-x-4 sm:py-0">
			<button
				{...menu.trigger}
				class="focus-outline self-end p-2 sm:hidden"
				aria-label={menu.open ? t.a11y.closeMenu : t.a11y.openMenu}
			>
				{#if menu.open}
					<Icon icon="mdi:close" class="size-6" />
				{:else}
					<Icon icon="mdi:menu" class="size-6" />
				{/if}
			</button>
			<div class="{menu.open ? 'block' : 'hidden'} sm:block">
				<ul
					{...menu.content}
					class="[&>li>a]:hover:text-accent mt-4 w-44 grid-cols-2 place-content-center gap-2 sm:mt-0 sm:flex sm:w-auto sm:gap-x-5 sm:gap-y-0 sm:[&>li>a]:block sm:[&>li>a]:px-2 sm:[&>li>a]:py-1 [&>li>a]:px-4 [&>li>a]:py-3 [&>li>a]:text-center [&>li>a]:font-medium"
				>
					<li class="col-span-2"><a href="/posts" class="sm:px-2 sm:py-1">{t.nav.posts}</a></li>
					<li class="col-span-2"><a href="/tags" class="sm:px-2 sm:py-1">{t.nav.tags}</a></li>
					<li class="col-span-2"><a href="/about" class="sm:px-2 sm:py-1">{t.nav.about}</a></li>
					{#if cfg.features.showArchives}
						<li class="col-span-2 flex items-center justify-center">
							<a href="/archives" class="focus-outline flex size-full justify-center p-3 sm:relative sm:size-8 sm:p-0" title={t.nav.archives}>
								<Icon icon="mdi:archive-outline" class="hidden sm:block sm:size-6" />
								<span class="sm:sr-only">{t.nav.archives}</span>
							</a>
						</li>
					{/if}
					{#if cfg.features.search !== false}
						<li class="col-span-1 flex items-center justify-center">
							<a href="/search" class="focus-outline relative size-8 flex items-center justify-center" title={t.nav.search}>
								<Icon icon="mdi:magnify" class="size-6" />
							</a>
						</li>
					{/if}
					{#if cfg.features.lightAndDarkMode}
						<li class="col-span-1 flex items-center justify-center">
							<ThemeToggle />
						</li>
					{/if}
				</ul>
			</div>
		</nav>
	</div>
</header>

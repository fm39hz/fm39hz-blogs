<script lang="ts">
import Icon from '@iconify/svelte';
import { useTranslations } from '$lib/i18n';
import { formatDate, formatISO } from '$lib/utils/date';
import cfg from '$lib/config';

let {
	pubDatetime,
	modDatetime,
	size = 'sm',
	className = '',
	locale = 'en',
}: {
	pubDatetime: string;
	modDatetime?: string | null;
	size?: 'sm' | 'lg';
	className?: string;
	locale?: string;
} = $props();

let t = $derived(useTranslations(locale));
let isModified = $derived(!!(modDatetime && modDatetime > pubDatetime));
let dt = $derived(isModified ? (modDatetime ?? pubDatetime) : pubDatetime);
let date = $derived(formatDate(dt, cfg.site.timezone, locale));
let iso = $derived(formatISO(dt, cfg.site.timezone));
</script>

<div class="flex items-center gap-x-2 text-muted-foreground {className}">
	<Icon icon="ph:calendar-blank" class="inline-block size-5 min-w-5 {size === 'sm' ? 'scale-90' : ''}" />
	{#if isModified}
		<span class="text-sm {size === 'lg' ? 'sm:text-base' : ''}">{t.post.updatedAt}:</span>
	{/if}
	<time class="text-sm {size === 'lg' ? 'sm:text-base' : ''}" datetime={iso}>{date}</time>
</div>

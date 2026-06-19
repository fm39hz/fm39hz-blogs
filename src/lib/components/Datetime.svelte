<script lang="ts">
import Icon from '@iconify/svelte';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import cfg from '$lib/config';

dayjs.extend(utc);
dayjs.extend(timezone);

let {
	pubDatetime,
	modDatetime,
	size = 'sm',
	className = '',
}: {
	pubDatetime: string;
	modDatetime?: string | null;
	size?: 'sm' | 'lg';
	className?: string;
} = $props();

let isModified = $derived(!!(modDatetime && modDatetime > pubDatetime));
let datetime = $derived(dayjs(isModified ? modDatetime : pubDatetime).tz(cfg.site.timezone));
let date = $derived(datetime.format('D MMM, YYYY'));
</script>

<div class="flex items-center gap-x-2 text-muted-foreground {className}">
	<Icon icon="ph:calendar-blank" class="inline-block size-5 min-w-5 {size === 'sm' ? 'scale-90' : ''}" />
	{#if isModified}
		<span class="text-sm {size === 'lg' ? 'sm:text-base' : ''}">Updated:</span>
	{/if}
	<time class="text-sm {size === 'lg' ? 'sm:text-base' : ''}" datetime={datetime.toISOString()}>
		{date}
	</time>
</div>

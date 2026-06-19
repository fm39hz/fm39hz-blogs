<script lang="ts">
import Icon from '@iconify/svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { formatDate, formatISO } from '$lib/utils/date';

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

<div class="datetime {className}">
  <Icon icon="ph:calendar-blank" class="icon {size}" />
  {#if isModified}
    <span class="label {size}">{t.post.updatedAt}:</span>
  {/if}
  <time datetime={iso} class={size}>{date}</time>
</div>

<style>
  .datetime { display: flex; align-items: center; gap: 0.5rem; color: var(--muted-fg); }
  .sm { font-size: 0.875rem; }
  .lg { font-size: 1rem; }
  .label { font-size: 0.875rem; }
  @media (width >= 640px) { .lg { font-size: 1rem; } }
</style>

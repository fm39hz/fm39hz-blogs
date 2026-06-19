<script lang="ts">
import Icon from '@iconify/svelte';
import cfg from '$lib/config';
import { useTranslations } from '$lib/i18n';
import { formatDate, formatISO } from '$lib/utils/date';
import styles from './Datetime.module.scss';

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

<div class={`${styles.root} ${className}`}>
  <Icon icon="ph:calendar-blank" class={styles[size]} />
  {#if isModified}
    <span class={styles.label}>{t.post.updatedAt}:</span>
  {/if}
  <time datetime={iso} class={styles[size]}>{date}</time>
</div>

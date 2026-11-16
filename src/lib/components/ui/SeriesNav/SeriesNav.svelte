<script lang="ts">
import type { SeriesInfo } from '$lib/content/types';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { articlePath } from '$lib/utils/localized-url';
import styles from './SeriesNav.module.scss';

let { series }: { series: SeriesInfo } = $props();

let t = $derived(useTranslations(locale.value));
</script>

<nav class={styles.nav} aria-label={t.series.label}>
	<div class={styles.grid}>
		{#if series.prev}
			<a
				href={articlePath(series.prev.slug, series.prev.lang)}
				class={[styles.card, styles.prevCard]}
				data-sveltekit-preload-data="hover"
				data-direction="backward"
			>
				<span class={styles.hint}>
					<Icon icon="ph:arrow-left" class={styles.arrow} />
					{t.series.flipPrev} (#{series.prev.order})
				</span>
				<strong class={styles.title}>{series.prev.title}</strong>
			</a>
		{:else}
			<div class={styles.emptySlot}></div>
		{/if}

		{#if series.next}
			<a
				href={articlePath(series.next.slug, series.next.lang)}
				class={[styles.card, styles.nextCard]}
				data-sveltekit-preload-data="hover"
				data-direction="forward"
			>
				<span class={styles.hint}>
					{t.series.flipNext} (#{series.next.order})
					<Icon icon="ph:arrow-right" class={styles.arrow} />
				</span>
				<strong class={styles.title}>{series.next.title}</strong>
			</a>
		{:else}
			<div class={styles.emptySlot}></div>
		{/if}
	</div>
</nav>

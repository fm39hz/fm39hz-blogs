<script lang="ts">
import type { SeriesInfo } from '$lib/content/types';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import { articlePath } from '$lib/utils/localized-url';
import styles from './SeriesHeader.module.scss';

let { series }: { series: SeriesInfo } = $props();

let t = $derived(useTranslations(locale.value));
let isOpen = $state(false);

function toggleOpen() {
	isOpen = !isOpen;
}
</script>

<aside class={styles.container} aria-label={t.series.label}>
	<button
		type="button"
		class={styles.header}
		onclick={toggleOpen}
		aria-expanded={isOpen}
		aria-controls="series-parts"
	>
		<span class={styles.meta}>
			<Icon icon="ph:books" class={styles.icon} />
			<span class={styles.label}>{t.series.label}:</span>
			<strong class={styles.title}>{series.title}</strong>
			<span class={styles.badge}>{t.series.part(series.currentOrder, series.totalParts)}</span>
		</span>
		<span class={styles.toggleLabel}>
			<span>{t.series.allParts}</span>
			<Icon icon={isOpen ? 'ph:caret-up' : 'ph:caret-down'} class={styles.caret} />
		</span>
	</button>

	{#if isOpen}
		<ol id="series-parts" class={styles.partList}>
			{#each series.parts as part}
				<li class={styles.partItem}>
					{#if part.isCurrent}
						<span class={styles.currentPart}>
							<span class={styles.partOrder}>#{part.order}</span>
							<span class={styles.partTitle}>{part.title}</span>
							<span class={styles.currentBadge}>({t.series.current})</span>
						</span>
					{:else}
						<a
							href={articlePath(part.slug, part.lang)}
							class={styles.partLink}
							data-direction={part.order < series.currentOrder ? 'backward' : 'forward'}
						>
							<span class={styles.partOrder}>#{part.order}</span>
							<span class={styles.partTitle}>{part.title}</span>
						</a>
					{/if}
				</li>
			{/each}
		</ol>
	{/if}
</aside>

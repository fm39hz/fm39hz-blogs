<script lang="ts">
import CellCheck from '$lib/components/content/CellCheck/CellCheck.svelte';
import type { CardCell, TableCardStackProps } from '$lib/components/content/contract';
import Icon from '$lib/design-system/primitives/Icon.svelte';
import { animationDurationMs } from '$lib/design-system/tokens/animation';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import styles from './TableCardStack.module.scss';

/** Mobile card view of a Markdown table; data is classified at build (rehypeResponsiveTables). */
let { headers, rows, comparison }: TableCardStackProps = $props();

let t = $derived(useTranslations(locale.value));
let activeIdx = $state(0);
let exitDir = $state<'right' | 'left' | null>(null);

const BADGE = {
	active: styles.badgeActive,
	inactive: styles.badgeInactive,
	neutral: styles.badgeNeutral,
} as const;

function step(direction: 'right' | 'left') {
	if (exitDir) return;
	exitDir = direction;
	activeIdx = (activeIdx + (direction === 'right' ? 1 : -1) + rows.length) % rows.length;
	setTimeout(() => {
		if (exitDir === direction) exitDir = null;
	}, animationDurationMs('page'));
}

function cardClass(idx: number) {
	const rel = (idx - activeIdx + rows.length) % rows.length;
	if (rel === 0) {
		if (exitDir === 'right') return [styles.card, styles.exitRight];
		if (exitDir === 'left') return [styles.card, styles.exitLeft];
		return [styles.card, styles.activeCard];
	}
	if (rel === 1) return [styles.card, styles.dummyCard2];
	if (rel === 2) return [styles.card, styles.dummyCard3];
	return [styles.card, styles.hiddenCard];
}
</script>

{#snippet value(cell: CardCell)}
  {#if cell.check}
    <CellCheck state={cell.check} />
  {:else}
    {@html cell.html}
  {/if}
{/snippet}

<div class={styles.container} aria-hidden="true">
  <div class={styles.stackWrapper}>
    {#each rows as row, idx (idx)}
      <div class={cardClass(idx)}>
        <h4 class={styles.cardTitle}>{@render value(row[0])}</h4>

        {#if headers.length === 2 && row[1]}
          <div class={styles.singleValue}>{@render value(row[1])}</div>
        {:else if comparison}
          <div class={styles.badgeRow}>
            {#each headers.slice(1) as header, hIdx}
              {@const cell = row[hIdx + 1]}
              <div class={[styles.badge, BADGE[cell.status]]}>
                <span class={styles.badgeLabel}>{@html header}</span>
                <span class={styles.badgeVal}>
                  {#if !cell.check && cell.status === 'active'}
                    <Icon icon="ph:check-bold" class={styles.badgeIcon} />
                  {:else if !cell.check && cell.status === 'inactive'}
                    <Icon icon="ph:x-bold" class={styles.badgeIcon} />
                  {/if}
                  {@render value(cell)}
                </span>
              </div>
            {/each}
          </div>
        {:else}
          <div class={styles.fieldList}>
            {#each headers.slice(1) as header, hIdx}
              {@const cell = row[hIdx + 1]}
              <div class={[styles.field, cell.status === 'inactive' && styles.fieldInactive]}>
                <span class={styles.fieldLabel}>{@html header}</span>
                <div class={styles.fieldValue}>{@render value(cell)}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class={styles.navigation}>
    <button type="button" onclick={() => step('left')} class={styles.navBtn}>
      <Icon icon="ph:arrow-left-bold" class={styles.navIcon} />
    </button>
    <span class={styles.indicator}>{t.table.cardPosition(activeIdx + 1, rows.length)}</span>
    <button type="button" onclick={() => step('right')} class={styles.navBtn}>
      <Icon icon="ph:arrow-right-bold" class={styles.navIcon} />
    </button>
  </div>
</div>

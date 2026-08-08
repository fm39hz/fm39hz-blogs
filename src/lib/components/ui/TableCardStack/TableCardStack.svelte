<script lang="ts">
import Icon from '@iconify/svelte';
import styles from './TableCardStack.module.scss';

interface Props {
	headers: string[];
	rows: string[][];
}

let { headers, rows }: Props = $props();

let activeIdx = $state(0);
let exitDir = $state<'right' | 'left' | null>(null);

const isComparison = $derived.by(() => {
	let shortCells = 0;
	let totalCells = 0;
	for (const row of rows) {
		const compareCells = row.slice(1);
		for (const cell of compareCells) {
			totalCells++;
			const cleanText = cell
				.replace(/<[^>]*>/g, '')
				.trim()
				.toLowerCase();
			const isShort =
				cleanText.length <= 6 ||
				[
					'yes',
					'no',
					'true',
					'false',
					'✓',
					'✗',
					'x',
					'-',
					'—',
					'có',
					'không',
					'checked',
					'unchecked',
				].includes(cleanText);
			if (isShort) shortCells++;
		}
	}
	if (totalCells === 0) return false;
	return shortCells / totalCells >= 0.8;
});

function getStatusType(valueStr: string) {
	const clean = valueStr
		.replace(/<[^>]*>/g, '')
		.trim()
		.toLowerCase();
	if (['yes', 'true', '✓', 'v', 'có', 'checked'].includes(clean)) return 'active';
	if (['no', 'false', '✗', 'x', '-', 'không', 'unchecked', '—'].includes(clean))
		return 'inactive';
	return 'neutral';
}

function nextCard() {
	if (exitDir) return;
	exitDir = 'right';
	activeIdx = (activeIdx + 1) % rows.length;
	setTimeout(() => {
		if (exitDir === 'right') exitDir = null;
	}, 350);
}

function prevCard() {
	if (exitDir) return;
	exitDir = 'left';
	activeIdx = (activeIdx - 1 + rows.length) % rows.length;
	setTimeout(() => {
		if (exitDir === 'left') exitDir = null;
	}, 350);
}

function cardClass(idx: number) {
	const rel = (idx - activeIdx + rows.length) % rows.length;
	if (rel === 0) {
		if (exitDir === 'right') return `${styles.card} ${styles.exitRight}`;
		if (exitDir === 'left') return `${styles.card} ${styles.exitLeft}`;
		return `${styles.card} ${styles.activeCard}`;
	}
	if (rel === 1) return `${styles.card} ${styles.dummyCard2}`;
	if (rel === 2) return `${styles.card} ${styles.dummyCard3}`;
	return `${styles.card} ${styles.hiddenCard}`;
}
</script>

<div class={styles.container} aria-hidden="true">
  <div class={styles.stackWrapper}>
    {#each rows as row, idx (idx)}
      <div class={cardClass(idx)}>
        <h4 class={styles.cardTitle}>{@html row[0]}</h4>

        {#if headers.length === 2 && row[1]}
          <div class={styles.singleValue}>{@html row[1]}</div>
        {:else if isComparison}
          <div class={styles.badgeRow}>
            {#each headers.slice(1) as header, hIdx}
              {@const colIdx = hIdx + 1}
              {@const val = row[colIdx]}
              {@const status = getStatusType(val)}
              <div class={`${styles.badge} ${status === 'active' ? styles.badgeActive : status === 'inactive' ? styles.badgeInactive : styles.badgeNeutral}`}>
                <span class={styles.badgeLabel}>{header}</span>
                <span class={styles.badgeVal}>
                  {#if status === 'active'}
                    <Icon icon="ph:check-bold" class={styles.badgeIcon} />
                  {:else if status === 'inactive'}
                    <Icon icon="ph:x-bold" class={styles.badgeIcon} />
                  {/if}
                  {@html val}
                </span>
              </div>
            {/each}
          </div>
        {:else}
          <div class={styles.fieldList}>
            {#each headers.slice(1) as header, hIdx}
              {@const colIdx = hIdx + 1}
              {@const val = row[colIdx]}
              {@const status = getStatusType(val)}
              <div class={`${styles.field} ${status === 'inactive' ? styles.fieldInactive : ''}`}>
                <span class={styles.fieldLabel}>{header}</span>
                <div class={styles.fieldValue}>{@html val}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class={styles.navigation}>
    <button type="button" onclick={prevCard} class={styles.navBtn}>
      <Icon icon="ph:arrow-left-bold" />
    </button>
    <span class={styles.indicator}>Row {activeIdx + 1} of {rows.length}</span>
    <button type="button" onclick={nextCard} class={styles.navBtn}>
      <Icon icon="ph:arrow-right-bold" />
    </button>
  </div>
</div>

<script lang="ts">
import Icon from '@iconify/svelte';
import { Spring } from 'svelte/motion';
import { AnimDurationMs } from '$lib/constants';
import styles from './TableCardStack.module.scss';

interface Props {
	headers: string[];
	rows: string[][];
}

let { headers, rows }: Props = $props();

let activeIdx = $state(0);
let isDragging = $state(false);
let startX = 0;
let startY = 0;

// State to manage the transition shuffle animations
let animatingCardIdx = $state<number | null>(null);
let animationDirection = $state<'next' | 'prev' | null>(null);

// Svelte spring motion store for smooth card drag & snap physics
const coords = new Spring(
	{ x: 0, y: 0 },
	{
		stiffness: 0.15,
		damping: 0.5,
	},
);

// Smart layout detection: check if table is a simple checklist or feature comparison matrix
const isComparison = $derived.by(() => {
	let shortCells = 0;
	let totalCells = 0;

	for (const row of rows) {
		// Skip first column (row title) and evaluate comparison cells
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
			if (isShort) {
				shortCells++;
			}
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
	if (['yes', 'true', '✓', 'v', 'có', 'checked'].includes(clean)) {
		return 'active';
	}
	if (['no', 'false', '✗', 'x', '-', 'không', 'unchecked', '—'].includes(clean)) {
		return 'inactive';
	}
	return 'neutral';
}

function handlePointerDown(e: PointerEvent) {
	if (animatingCardIdx !== null) return;
	if (e.button !== 0) return;
	isDragging = true;
	startX = e.clientX;
	startY = e.clientY;

	const el = e.currentTarget as HTMLElement;
	el.setPointerCapture(e.pointerId);
}

function handlePointerMove(e: PointerEvent) {
	if (!isDragging) return;
	const dx = e.clientX - startX;
	const dy = e.clientY - startY;
	coords.set({ x: dx, y: dy });
}

function handlePointerUp(e: PointerEvent) {
	if (!isDragging) return;
	isDragging = false;

	const el = e.currentTarget as HTMLElement;
	el.releasePointerCapture(e.pointerId);

	const threshold = 100;
	const currentCoords = $coords;

	if (currentCoords.x > threshold) {
		nextCard();
	} else if (currentCoords.x < -threshold) {
		prevCard();
	} else {
		coords.set({ x: 0, y: 0 });
	}
}

function nextCard() {
	if (animatingCardIdx !== null) return;

	animationDirection = 'next';
	animatingCardIdx = activeIdx;
	coords.set({ x: 0, y: 0 }, { hard: true });
	activeIdx = (activeIdx + 1) % rows.length;

	setTimeout(() => {
		animatingCardIdx = null;
		animationDirection = null;
	}, AnimDurationMs.scene);
}

function prevCard() {
	if (animatingCardIdx !== null) return;

	animationDirection = 'prev';
	const targetIdx = (activeIdx - 1 + rows.length) % rows.length;
	animatingCardIdx = targetIdx;
	coords.set({ x: 0, y: 0 }, { hard: true });
	activeIdx = targetIdx;

	setTimeout(() => {
		animatingCardIdx = null;
		animationDirection = null;
	}, AnimDurationMs.scene);
}

function getCardClass(idx: number) {
	if (animatingCardIdx !== null) {
		if (animationDirection === 'next') {
			if (idx === animatingCardIdx) {
				return `${styles.card} ${styles.slideDown}`;
			}
		} else if (animationDirection === 'prev') {
			if (idx === animatingCardIdx) {
				return `${styles.card} ${styles.slideUp}`;
			}
		}
	}

	const rel = (idx - activeIdx + rows.length) % rows.length;
	if (rel === 0) return `${styles.card} ${styles.activeCard}`;
	if (rel === 1) return `${styles.card} ${styles.dummyCard2}`;
	if (rel === 2) return `${styles.card} ${styles.dummyCard3}`;
	return `${styles.card} ${styles.hiddenCard}`;
}
</script>

<div class={styles.container}>
  <div class={styles.stackWrapper}>
    {#each rows as row, idx (idx)}
      {@const rel = (idx - activeIdx + rows.length) % rows.length}
      <div
        class={getCardClass(idx)}
        style={rel === 0 && isDragging ? `transform: translate3d(${$coords.x}px, ${$coords.y}px, 0) rotate(${$coords.x * 0.08}deg);` : ''}
        onpointerdown={rel === 0 ? handlePointerDown : null}
        onpointermove={rel === 0 ? handlePointerMove : null}
        onpointerup={rel === 0 ? handlePointerUp : null}
        role="button"
        tabindex="0"
        aria-label="Table row card. Swipe left or right to switch rows."
      >
        <!-- Card Primary Title (Always Column 0) -->
        <h4 class={styles.cardTitle}>{@html row[0]}</h4>

        {#if headers.length === 2}
          <!-- Bố cục đơn giản: Chỉ có 2 cột (1 Title, 1 Value) -->
          <div class={styles.singleValue}>
            {@html row[1]}
          </div>
        {:else if isComparison}
          <!-- Bố cục 1: So sánh đặc tính dạng ngang (Horizontal comparison pills) -->
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
          <!-- Bố cục 2: Xếp chồng phân mảnh dọc cho văn bản dài (Vertical descriptive fields) -->
          <div class={styles.fieldList}>
            {#each headers.slice(1) as header, hIdx}
              {@const colIdx = hIdx + 1}
              {@const val = row[colIdx]}
              {@const status = getStatusType(val)}
              <div class={`${styles.field} ${status === 'inactive' ? styles.fieldInactive : ''}`}>
                <span class={styles.fieldLabel}>{header}</span>
                <div class={styles.fieldValue}>
                  {@html val}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Manual Navigation Controls -->
  <div class={styles.navigation}>
    <button type="button" onclick={prevCard} class={styles.navBtn} aria-label="Previous row card">
      <Icon icon="ph:arrow-left-bold" />
    </button>
    <span class={styles.indicator}>
      Row {activeIdx + 1} of {rows.length}
    </span>
    <button type="button" onclick={nextCard} class={styles.navBtn} aria-label="Next row card">
      <Icon icon="ph:arrow-right-bold" />
    </button>
  </div>
</div>

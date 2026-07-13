<script lang="ts">
import Icon from '@iconify/svelte';
import { spring } from 'svelte/motion';
import { browser } from '$app/environment';
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
const coords = spring(
	{ x: 0, y: 0 },
	{
		stiffness: 0.15,
		damping: 0.5,
	},
);

function handlePointerDown(e: PointerEvent) {
	if (animatingCardIdx !== null) return; // Block drag during shuffle animations
	if (e.button !== 0) return; // Only capture left click
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
		// Swipe right -> Next Card (Slide top card to bottom from right)
		nextCard();
	} else if (currentCoords.x < -threshold) {
		// Swipe left -> Prev Card (Slide bottom card to top from left)
		prevCard();
	} else {
		// Snap back to center
		coords.set({ x: 0, y: 0 });
	}
}

function nextCard() {
	if (animatingCardIdx !== null) return;

	animationDirection = 'next';
	animatingCardIdx = activeIdx;

	// Reset drag coords instantly before Svelte re-renders
	coords.set({ x: 0, y: 0 }, { hard: true });

	// Advance index
	activeIdx = (activeIdx + 1) % rows.length;

	setTimeout(() => {
		animatingCardIdx = null;
		animationDirection = null;
	}, 500);
}

function prevCard() {
	if (animatingCardIdx !== null) return;

	animationDirection = 'prev';
	const targetIdx = (activeIdx - 1 + rows.length) % rows.length;
	animatingCardIdx = targetIdx;

	coords.set({ x: 0, y: 0 }, { hard: true });

	// Set new active index (card starts sliding up)
	activeIdx = targetIdx;

	setTimeout(() => {
		animatingCardIdx = null;
		animationDirection = null;
	}, 500);
}

function getCardClass(idx: number) {
	// If currently animating a shuffle transition
	if (animatingCardIdx !== null) {
		if (animationDirection === 'next') {
			// Old top card is sliding down to the bottom
			if (idx === animatingCardIdx) {
				return `${styles.card} ${styles.slideDown}`;
			}
		} else if (animationDirection === 'prev') {
			// New active card is sliding up from the bottom to the top
			if (idx === animatingCardIdx) {
				return `${styles.card} ${styles.slideUp}`;
			}
		}
	}

	// Static positioning classes based on activeIdx
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
        aria-label="Table row cards stack. Swipe left or right to switch rows."
      >
        {#each headers as header, colIdx}
          <div class={styles.field}>
            <span class={styles.label}>{header}</span>
            <div class={styles.value}>{@html row[colIdx]}</div>
          </div>
        {/each}
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

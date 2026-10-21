import type { Attachment } from 'svelte/attachments';
import { on } from 'svelte/events';

/**
 * Pan/zoom as state — the template renders `transform`; nothing writes styles.
 *
 * Gesture policy for article reading:
 *   - plain wheel → page scrolls
 *   - shift+wheel or ctrl/meta+wheel (trackpad pinch) → zoom around the cursor
 *   - middle-button drag → pan
 *   - double-click → reset
 *
 * Content always covers the viewport (scale ≥ 1, offsets clamped), so a
 * diagram can never be dragged out of view.
 */

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.12;

type Drag = { id: number; startX: number; startY: number; x: number; y: number };

export class PanZoom {
	scale = $state(1);
	x = $state(0);
	y = $state(0);
	/** Bound from the template: viewport box and unscaled content height. */
	viewWidth = $state(0);
	viewHeight = $state(0);
	contentHeight = $state(0);
	#drag = $state<Drag | null>(null);

	readonly dragging = $derived(this.#drag !== null);
	readonly transform = $derived(
		this.scale === 1 && this.x === 0 && this.y === 0
			? undefined
			: `translate(${this.x}px, ${this.y}px) scale(${this.scale})`,
	);

	#clamp(x: number, y: number, scale: number) {
		const minX = Math.min(0, this.viewWidth - this.viewWidth * scale);
		const minY = Math.min(0, this.viewHeight - this.contentHeight * scale);
		this.x = Math.min(0, Math.max(minX, x));
		this.y = Math.min(0, Math.max(minY, y));
	}

	/** Non-passive wheel listener (Svelte's `onwheel` is passive, so it cannot preventDefault). */
	wheel: Attachment<HTMLElement> = (node) =>
		on(
			node,
			'wheel',
			(event) => {
				if (!(event.shiftKey || event.ctrlKey || event.metaKey)) return;
				event.preventDefault();
				const box = node.getBoundingClientRect();
				const px = event.clientX - box.left;
				const py = event.clientY - box.top;
				const factor = event.deltaY < 0 ? 1 + STEP : 1 / (1 + STEP);
				const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, this.scale * factor));
				const ratio = next / this.scale;
				this.scale = next;
				this.#clamp(px - (px - this.x) * ratio, py - (py - this.y) * ratio, next);
			},
			{ passive: false },
		);

	down = (event: PointerEvent) => {
		// 1 = middle; left/right never start a pan
		if (event.button !== 1) return;
		event.preventDefault();
		this.#drag = {
			id: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			x: this.x,
			y: this.y,
		};
	};

	move = (event: PointerEvent) => {
		const drag = this.#drag;
		if (!drag || event.pointerId !== drag.id) return;
		this.#clamp(
			drag.x + event.clientX - drag.startX,
			drag.y + event.clientY - drag.startY,
			this.scale,
		);
	};

	up = (event: PointerEvent) => {
		if (this.#drag?.id === event.pointerId) this.#drag = null;
	};

	reset = () => {
		this.scale = 1;
		this.x = 0;
		this.y = 0;
	};
}

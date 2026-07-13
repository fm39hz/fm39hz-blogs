import { Collapsible } from 'melt/builders';
import { lockPageScroll, type ScrollLockHandle } from '$lib/utils/scrollLock';

export type DismissibleCollapsibleOptions = {
	/**
	 * Close when pointerdown lands outside `rootEl`.
	 * Default true (GearMenu / panel-over-page pattern).
	 */
	outsideClick?: boolean;
	/**
	 * Lock document scroll while open (mobile full/page overlays).
	 * Default false (dropdowns don't need it).
	 */
	scrollLock?: boolean;
	/** Called after open flips — for chrome pin / baseline, etc. */
	onOpenChange?: (open: boolean, meta: { y: number }) => void;
};

/**
 * Melt Collapsible + dismiss policy shared by GearMenu & Header nav.
 * Template spreads `menu.trigger` / `menu.content`; bind `rootEl` to the
 * containment node for outside-click.
 */
export class DismissibleCollapsible {
	readonly menu = new Collapsible();
	/** Containment for outside-click (trigger + panel) */
	rootEl = $state<HTMLElement | undefined>(undefined);

	#opts: Required<Pick<DismissibleCollapsibleOptions, 'outsideClick' | 'scrollLock'>> &
		Pick<DismissibleCollapsibleOptions, 'onOpenChange'>;

	constructor(opts: DismissibleCollapsibleOptions = {}) {
		this.#opts = {
			outsideClick: opts.outsideClick ?? true,
			scrollLock: opts.scrollLock ?? false,
			onOpenChange: opts.onOpenChange,
		};

		$effect(() => {
			if (typeof window === 'undefined' || !this.menu.open) return;

			const y = window.scrollY;
			this.#opts.onOpenChange?.(true, { y });

			let lock: ScrollLockHandle | null = null;
			if (this.#opts.scrollLock) {
				lock = lockPageScroll();
			}

			const onPointer = (e: MouseEvent) => {
				if (!this.#opts.outsideClick) return;
				const target = e.target as HTMLElement | null;
				// Detached mid-render (Svelte) — ignore
				if (!target?.isConnected) return;
				if (this.rootEl && !this.rootEl.contains(target)) {
					this.close();
				}
			};

			const onKey = (e: KeyboardEvent) => {
				if (e.key === 'Escape') this.close();
			};

			// click (not pointerdown): open-toggle on trigger finishes first
			document.addEventListener('click', onPointer);
			window.addEventListener('keydown', onKey);

			return () => {
				document.removeEventListener('click', onPointer);
				window.removeEventListener('keydown', onKey);
				const restoredY = lock?.y ?? y;
				lock?.release();
				this.#opts.onOpenChange?.(false, { y: restoredY });
			};
		});
	}

	get open(): boolean {
		return this.menu.open;
	}

	close = () => {
		this.menu.open = false;
	};
}

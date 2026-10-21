import { Collapsible } from 'melt/builders';

export type DismissibleCollapsibleOptions = {
	/**
	 * Close when pointerdown lands outside `rootEl`.
	 * Default true (GearMenu / panel-over-page pattern).
	 */
	outsideClick?: boolean;
	/**
	 * Lock document scroll while open (mobile full/page overlays): the template
	 * renders `data-scroll-lock={x.locksScroll || undefined}` and global.scss
	 * pins the page. Default false (dropdowns don't need it).
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
			this.#opts.onOpenChange?.(true, { y: window.scrollY });
			// overflow lock keeps the scroll position, so the close-time Y is current
			return () => this.#opts.onOpenChange?.(false, { y: window.scrollY });
		});
	}

	handleDocumentClick = (event: MouseEvent) => {
		if (!this.menu.open || !this.#opts.outsideClick) return;
		const target = event.target;
		if (!(target instanceof Node) || !target.isConnected) return;
		if (this.rootEl && !this.rootEl.contains(target)) this.close();
	};

	handleKeydown = (event: KeyboardEvent) => {
		if (this.menu.open && event.key === 'Escape') this.close();
	};

	get open(): boolean {
		return this.menu.open;
	}

	get locksScroll(): boolean {
		return this.#opts.scrollLock && this.menu.open;
	}

	close = () => {
		this.menu.open = false;
	};
}

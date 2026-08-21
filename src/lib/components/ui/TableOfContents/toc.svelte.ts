/**
 * TOC active tracking + center-when-possible list scroll.
 *
 * Target: active item on vertical mid-line of the scrollport.
 * Clamp scrollTop to [0, max] — near ends, equal above/below is
 * impossible, so the item sits as close to center as the range allows
 * (first items hug top, last items hug bottom). No fake padding.
 */

export type TocHeading = { id: string; text: string; level: number };

export function collectHeadings(prose: Element): TocHeading[] {
	const elements = prose.querySelectorAll<HTMLHeadingElement>('h2, h3');
	return Array.from(elements).map((el) => {
		if (!el.id) {
			const text = el.textContent ?? '';
			el.id = text
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');
		}
		return {
			id: el.id,
			text: el.textContent ?? '',
			level: Number.parseInt(el.tagName.substring(1), 10),
		};
	});
}

/** Ideal scrollTop to put `active` on mid-line, clamped to legal range. */
export function centerScrollTop(list: HTMLElement, active: HTMLElement): number {
	// clear any legacy center-pad so math uses natural layout
	if (list.style.paddingBlock) list.style.paddingBlock = '';

	const mid = list.clientHeight / 2;
	const itemMid = active.offsetTop + active.offsetHeight / 2;
	const ideal = itemMid - mid;
	const max = Math.max(0, list.scrollHeight - list.clientHeight);
	return Math.min(max, Math.max(0, ideal));
}

export function centerActiveInList(list: HTMLElement, active: HTMLElement, smooth = true) {
	const top = centerScrollTop(list, active);
	list.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
}

/**
 * Scroll-based active heading tracker.
 *
 * Uses `scroll` events throttled by `requestAnimationFrame` instead of
 * `IntersectionObserver`. On every frame we walk every heading and pick
 * the last one whose top edge has crossed a threshold line near the top
 * of the viewport. Two special cases keep things honest:
 *
 * 1. **Bottom-of-page**: when the user has scrolled to the very end,
 *    the last heading wins regardless of its position — the old
 *    IntersectionObserver approach missed this because the heading
 *    could sit above the narrow observation band.
 *
 * 2. **Before any heading**: if no heading has crossed the threshold
 *    yet, the first heading is selected so the TOC is never empty.
 *
 * `getBoundingClientRect()` gives the position relative to the
 * viewport, which is immune to nested `position: relative` ancestors
 * that made the old `offsetTop` fallback unreliable.
 */
export function observeActiveHeading(
	items: TocHeading[],
	onActive: (id: string) => void,
): () => void {
	if (items.length === 0) return () => {};

	/** Fraction of viewport height used as the activation line. */
	const THRESHOLD_RATIO = 0.2;

	/**
	 * Slack in pixels for the bottom-of-page check.
	 * Accounts for sub-pixel rounding and fractional scroll values.
	 */
	const BOTTOM_SLACK = 2;

	let ticking = false;
	let lastActiveId = '';

	const resolve = (id: string) => {
		if (id && id !== lastActiveId) {
			lastActiveId = id;
			onActive(id);
		}
	};

	const update = () => {
		ticking = false;

		const doc = document.documentElement;
		const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - BOTTOM_SLACK;

		// At the very bottom of the page the last heading always wins.
		if (atBottom) {
			resolve(items[items.length - 1].id);
			return;
		}

		// Walk every heading. The last one whose top edge is at or above
		// the threshold line is the active one.
		const threshold = window.innerHeight * THRESHOLD_RATIO;
		let activeId = items[0]?.id ?? '';

		for (const item of items) {
			const el = document.getElementById(item.id);
			if (!el) continue;
			if (el.getBoundingClientRect().top <= threshold) {
				activeId = item.id;
			}
			// No break — always walk the full list so the *last* heading
			// above the line wins, not the first.
		}

		resolve(activeId);
	};

	const onScroll = () => {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(update);
		}
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });

	// Initial pick so the TOC is correct on mount / navigation.
	update();

	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onScroll);
	};
}

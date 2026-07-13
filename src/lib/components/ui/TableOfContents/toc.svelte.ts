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

export function observeActiveHeading(
	items: TocHeading[],
	onActive: (id: string) => void,
): () => void {
	const headingStates = new Map<string, boolean>();

	const pick = () => {
		for (const item of items) {
			if (headingStates.get(item.id)) {
				onActive(item.id);
				return;
			}
		}
		const scrollY = window.scrollY;
		let lastAboveId = items[0]?.id ?? '';
		for (const item of items) {
			const el = document.getElementById(item.id);
			if (el && el.offsetTop - 120 < scrollY) lastAboveId = item.id;
			else break;
		}
		if (lastAboveId) onActive(lastAboveId);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				headingStates.set(entry.target.id, entry.isIntersecting);
			}
			pick();
		},
		{ rootMargin: '-45% 0px -45% 0px' },
	);

	for (const item of items) {
		const el = document.getElementById(item.id);
		if (el) observer.observe(el);
	}

	pick();
	return () => observer.disconnect();
}

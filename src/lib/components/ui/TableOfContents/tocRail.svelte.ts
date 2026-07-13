/**
 * Scroll-linked equal insets for a fixed TOC rail (Notion-style).
 * top === bottom always. As page scrolls down, both shrink → panel grows
 * while staying vertically centered. Label is flex-start of the rail
 * so it rides the top edge up as the rail expands.
 */

export type TocRailOpts = {
	/** Starting equal inset (vh). Default 17. */
	maxInsetVh?: number;
	/** Minimum equal inset (px) when fully expanded. Default 16. */
	minInsetPx?: number;
	/** Page scroll (px) to go from max → min inset. Default 480. */
	expandRangePx?: number;
};

export function bindTocRailInsets(rail: HTMLElement, opts: TocRailOpts = {}) {
	const maxVh = opts.maxInsetVh ?? 17;
	const minPx = opts.minInsetPx ?? 16;
	const range = opts.expandRangePx ?? 480;

	const apply = () => {
		const maxPx = (maxVh / 100) * window.innerHeight;
		const t = Math.min(1, Math.max(0, window.scrollY / range));
		const inset = Math.round(maxPx + (minPx - maxPx) * t);
		rail.style.setProperty('--toc-inset', `${inset}px`);
	};

	apply();
	window.addEventListener('scroll', apply, { passive: true });
	window.addEventListener('resize', apply);
	return () => {
		window.removeEventListener('scroll', apply);
		window.removeEventListener('resize', apply);
	};
}

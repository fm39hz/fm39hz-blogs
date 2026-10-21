import type { ContentHeading } from '$lib/content/types';

/**
 * TOC model. Headings come from build-time metadata (`remarkHeadingSlugs`
 * stamps the same ids into the prose), never from querying the article.
 */

/** Fraction of viewport height used as the activation line. */
const THRESHOLD_RATIO = 0.2;
/** Slack for the bottom-of-page check (sub-pixel / fractional scroll). */
const BOTTOM_SLACK = 2;

export function tocHeadings(headings: ContentHeading[] = []): ContentHeading[] {
	return headings.filter((h) => h.depth === 2 || h.depth === 3);
}

/**
 * Last heading whose top edge crossed the activation line; the last heading
 * wins at the very bottom, the first before any crossing. Reads geometry of
 * Markdown headings only — no writes.
 */
export function activeHeadingId(
	items: ContentHeading[],
	scrollY: number,
	viewport: number,
): string {
	if (items.length === 0) return '';
	const docHeight = document.documentElement.scrollHeight;
	if (scrollY + viewport >= docHeight - BOTTOM_SLACK) return items[items.length - 1].id;

	const threshold = viewport * THRESHOLD_RATIO;
	let active = items[0].id;
	for (const item of items) {
		const top = document.getElementById(item.id)?.getBoundingClientRect().top;
		if (top !== undefined && top <= threshold) active = item.id;
	}
	return active;
}

/**
 * Scroll the list so `active` sits on its vertical mid-line, clamped to the
 * legal range (first items hug the top, last items the bottom). Element
 * scroll position has no declarative binding, so this is a browser-API call.
 */
export function centerActiveInList(list: HTMLElement, active: HTMLElement, smooth = true) {
	const ideal = active.offsetTop + active.offsetHeight / 2 - list.clientHeight / 2;
	const max = Math.max(0, list.scrollHeight - list.clientHeight);
	list.scrollTo({ top: Math.min(max, Math.max(0, ideal)), behavior: smooth ? 'smooth' : 'auto' });
}

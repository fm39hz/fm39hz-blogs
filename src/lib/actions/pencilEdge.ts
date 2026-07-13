/**
 * Pencil-edge lifecycle for decorative surfaces (blockquote, mermaid SVG, …).
 *
 * Contract:
 * - Always keep class `pencil-edge` (layer + filter base styles in global.scss)
 * - On-screen  → animated `#pencil-wiggle` (seed churn only while visible)
 * - Off-screen → `#pencil-edge-static` via `data-pencil="static"` (no per-frame filter)
 * - prefers-reduced-motion → static always (CSS)
 *
 * Not a framework re-render fix — pauses paint work when the user cannot see it.
 */

const SELECTOR = 'blockquote, .sketchy-quote, .pencil-edge';

function setStatic(el: Element, on: boolean) {
	if (!(el instanceof HTMLElement)) return;
	if (on) el.dataset.pencil = 'static';
	else delete el.dataset.pencil;
}

/**
 * Observe existing + future pencil targets under `root`.
 * Call after mermaid injects SVGs (or use MutationObserver via `watch`).
 */
export function observePencilEdges(
	root: ParentNode,
	opts: { rootMargin?: string; watch?: boolean } = {},
) {
	if (typeof IntersectionObserver === 'undefined') return () => {};

	const reduce =
		typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				// reduced-motion: CSS already forces static; skip attr churn
				if (reduce) {
					setStatic(entry.target, true);
					continue;
				}
				// visible → animate; hidden → static (cached edge, no seed tick)
				setStatic(entry.target, !entry.isIntersecting);
			}
		},
		{
			// start static a bit before fully leaving, animate slightly early
			rootMargin: opts.rootMargin ?? '10% 0px 10% 0px',
			threshold: 0,
		},
	);

	const seen = new WeakSet<Element>();

	const track = (el: Element) => {
		if (seen.has(el)) return;
		seen.add(el);
		// default static until first IO callback (avoids animating off-screen on load)
		setStatic(el, true);
		io.observe(el);
	};

	const scan = () => {
		root.querySelectorAll(SELECTOR).forEach(track);
	};

	scan();

	let mo: MutationObserver | undefined;
	if (opts.watch !== false && typeof MutationObserver !== 'undefined') {
		mo = new MutationObserver(() => scan());
		if (root instanceof Node) {
			mo.observe(root, { childList: true, subtree: true });
		}
	}

	return () => {
		io.disconnect();
		mo?.disconnect();
	};
}

/** Svelte action: wire pause/resume for an article (or any container). */
export function pencilEdge(node: HTMLElement) {
	const stop = observePencilEdges(node, { watch: true });
	return { destroy: stop };
}

/**
 * Declarative size binding — reports border-box block size via callback.
 */
export function resizeHeight(node: HTMLElement, onHeight: (h: number) => void) {
	const report = (entry: ResizeObserverEntry) => {
		onHeight(Math.ceil(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height));
	};

	const ro = new ResizeObserver(([entry]) => report(entry));
	ro.observe(node);

	return {
		update(next: (h: number) => void) {
			onHeight = next;
		},
		destroy() {
			ro.disconnect();
		},
	};
}

import { browser } from '$app/env';

export type ObserveCallback = (entry: IntersectionObserverEntry) => void;

const callbacks = new WeakMap<Element, ObserveCallback>();
let observer: IntersectionObserver | null = null;

export function observeIntersection(
	el: Element,
	cb: ObserveCallback,
	options?: IntersectionObserverInit,
): () => void {
	if (!browser) return () => {};

	if (!observer) {
		observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				const callback = callbacks.get(entry.target);
				if (callback) {
					callback(entry);
				}
			}
		}, options || { threshold: 0.1 });
	}

	callbacks.set(el, cb);
	observer.observe(el);

	return () => {
		callbacks.delete(el);
		observer?.unobserve(el);
	};
}

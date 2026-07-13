/**
 * Page scroll lock for overlays/drawers.
 *
 * Locks via body position:fixed (iOS-safe). Unlock restores the exact Y
 * with scroll-behavior forced to `auto` so global `scroll-behavior: smooth`
 * cannot animate 0 → Y.
 */

export type ScrollLockHandle = {
	/** Document Y when lock was taken */
	readonly y: number;
	release: () => void;
};

type Snapshot = {
	position: string;
	top: string;
	width: string;
	overflow: string;
	scrollBehavior: string;
};

export function lockPageScroll(): ScrollLockHandle {
	const y = window.scrollY;
	const { body, documentElement } = document;

	const snap: Snapshot = {
		position: body.style.position,
		top: body.style.top,
		width: body.style.width,
		overflow: body.style.overflow,
		scrollBehavior: documentElement.style.scrollBehavior,
	};

	body.style.position = 'fixed';
	body.style.top = `-${y}px`;
	body.style.width = '100%';
	body.style.overflow = 'hidden';

	let released = false;

	return {
		y,
		release() {
			if (released) return;
			released = true;

			// Instant restore — must beat html { scroll-behavior: smooth }
			documentElement.style.scrollBehavior = 'auto';

			body.style.position = snap.position;
			body.style.top = snap.top;
			body.style.width = snap.width;
			body.style.overflow = snap.overflow;

			window.scrollTo(0, y);

			// Defer restoring smooth so the jump never inherits it
			requestAnimationFrame(() => {
				documentElement.style.scrollBehavior = snap.scrollBehavior;
			});
		},
	};
}

import type { Attachment } from 'svelte/attachments';

export interface TitleTransitionFrame {
	progress: number;
	/** Sticky group pinned: the toolbar's own title takes over, the projection freezes. */
	pinned: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	fontSize: number;
	lineHeight: number;
}

/** One rAF-scheduled read per scroll frame; Svelte alone renders the projection.
 * Source and target are untransformed, aria-hidden layout probes, never clones
 * of the moving DOM node. No reparenting, inline style writes or scroll writes.
 *
 * `sticky` is the toolbar group that pins while the title collapses, and it is
 * the only ResizeObserver target. The observer exists solely to invalidate the
 * cached font sizes, and both endpoints share the rem type scale with that
 * group, so its box size changes exactly when those caches go stale. Endpoint
 * rects and the scroll range are re-read live on every frame, so no other node
 * is a signal: the root fires on unrelated document growth, and the header is
 * the element this adapter writes its own frame into.
 *
 * The adapter stops at the pin: once `pinned` is true the sticky group no
 * longer moves, its own compact title is on screen, and the projected h1 is
 * frozen over it, so the scroll callback returns before touching a rect or
 * writing a frame. Scrolling back above the pin point resumes projection.
 */
export function titleTransition(
	source: () => HTMLElement | undefined,
	target: () => HTMLElement | undefined,
	sticky: () => HTMLElement | undefined,
	onFrame: (frame: TitleTransitionFrame | null) => void,
): Attachment<HTMLElement> {
	return (header) => {
		const from = source();
		const to = target();
		const group = sticky();
		if (!from || !to || !group) return;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let active = true;
		let resizeFrame = 0;
		let scheduled = 0;
		let pinAt = 0;
		let pinned = false;
		let startFont = 0;
		let endFont = 0;
		let startLine = 0;
		let endLine = 0;

		function atRest(scrollY: number) {
			return pinned && scrollY >= pinAt;
		}

		function update() {
			const scrollY = window.scrollY;
			// The sticky group is pinned and no longer moves. Its own compact title
			// is on screen and the projected h1 is frozen over it, so a frame would
			// only re-read rects that are constant by construction.
			if (atRest(scrollY)) return;
			if (!from || !to || !header) return;
			const start = from.getBoundingClientRect();
			const end = to.getBoundingClientRect();
			// The source header stays in normal flow. Its document bottom is
			// where the following toolbar starts sticking, even while scrolled.
			const distance = header.getBoundingClientRect().bottom + scrollY;
			pinAt = distance;
			let progress = Math.min(1, Math.max(0, scrollY / Math.max(1, distance)));
			if (reducedMotion.matches) progress = progress < 1 ? 0 : 1;
			pinned = progress === 1;
			onFrame({
				progress,
				pinned,
				x: (end.left - start.left) * progress,
				y: (end.top - start.top) * progress,
				width: start.width + (end.width - start.width) * progress,
				height: start.height + (end.height - start.height) * progress,
				fontSize: startFont + (endFont - startFont) * progress,
				lineHeight: startLine + (endLine - startLine) * progress,
			});
		}

		function measure() {
			if (!from || !to) return;
			const start = getComputedStyle(from);
			const end = getComputedStyle(to);
			startFont = Number.parseFloat(start.fontSize);
			endFont = Number.parseFloat(end.fontSize);
			startLine = Number.parseFloat(start.lineHeight);
			endLine = Number.parseFloat(end.lineHeight);
			update();
		}

		/** At most one projection per animation frame, whatever the browser does
		 * with scroll event coalescing. */
		function schedule() {
			if (scheduled) return;
			scheduled = requestAnimationFrame(() => {
				scheduled = 0;
				update();
			});
		}

		function onScroll() {
			// Pinned: one comparison per scroll event, no frame, no layout read.
			if (atRest(window.scrollY)) return;
			schedule();
		}

		measure();
		window.addEventListener('scroll', onScroll, { passive: true });
		const observer = new ResizeObserver(() => {
			cancelAnimationFrame(resizeFrame);
			resizeFrame = requestAnimationFrame(measure);
		});
		observer.observe(group);
		reducedMotion.addEventListener('change', update);
		void document.fonts.ready.then(() => {
			if (active) measure();
		});

		return () => {
			active = false;
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(scheduled);
			scheduled = 0;
			observer.disconnect();
			cancelAnimationFrame(resizeFrame);
			reducedMotion.removeEventListener('change', update);
			onFrame(null);
		};
	};
}

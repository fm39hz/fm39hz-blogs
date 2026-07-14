import { annotate } from 'rough-notation';
import { prefersReducedMotion } from '$lib/animations/reduce';
import { AnimDurationMs } from '$lib/constants';
import { observeIntersection } from '$lib/utils/observer';

/**
 * Applies rough-notation hand-drawn annotations to markdown prose elements.
 *
 * - mark: highlight brushstroke (suited for inline emphasis, supports multiline)
 *
 * Annotations are triggered lazily via a shared IntersectionObserver so they draw
 * as the user scrolls to them, not all at once on load.
 */
export function roughNotation(node: HTMLElement) {
	if (typeof window === 'undefined') return;

	// Read CSS custom property at runtime so we honour the active theme
	function getCSSVar(name: string): string {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	const unobserves: (() => void)[] = [];
	const annotations: ReturnType<typeof annotate>[] = [];

	// --- mark: highlight brushstroke ---
	const marks = node.querySelectorAll<HTMLElement>('mark');
	marks.forEach((mark) => {
		const baseColor = getCSSVar('--accent');
		// Build a semi-transparent highlight from the accent colour
		const color = `color-mix(in srgb, ${baseColor} 40%, transparent)`;
		const ann = annotate(mark, {
			type: 'highlight',
			color,
			multiline: true,
			animate: !prefersReducedMotion(),
			animationDuration: AnimDurationMs.scene,
		});
		annotations.push(ann);

		let stop: () => void;
		stop = observeIntersection(
			mark,
			(entry) => {
				if (entry.isIntersecting) {
					ann.show();
					stop();
				}
			},
			{ threshold: 0.1 },
		);
		unobserves.push(stop);
	});

	return {
		destroy() {
			for (const stop of unobserves) stop();
			for (const ann of annotations) ann.remove();
		},
	};
}

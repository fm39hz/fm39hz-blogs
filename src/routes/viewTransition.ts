import { prefersReducedMotion } from 'svelte/motion';
import { onNavigate } from '$app/navigation';
import { setTransitionDirection, type TransitionDirection } from '$lib/document/root';

type Navigation = Parameters<Parameters<typeof onNavigate>[0]>[0];

function classifyDirection(navigation: Navigation): TransitionDirection | null {
	if (navigation.type === 'popstate') {
		if (navigation.delta && navigation.delta < 0) return 'backward';
		if (navigation.delta && navigation.delta > 0) return 'forward';
		return null;
	}
	if (typeof document === 'undefined') return null;
	const trigger = document.activeElement?.closest('[data-direction]');
	const dir = trigger?.getAttribute('data-direction');
	if (dir === 'forward' || dir === 'backward') return dir;
	return null;
}

export function viewTransition(navigation: Navigation): Promise<void> | void {
	if (!document.startViewTransition || prefersReducedMotion.current) return;
	if (navigation.from?.url?.pathname === navigation.to?.url?.pathname) return;

	const direction = classifyDirection(navigation);
	if (direction) {
		setTransitionDirection(direction);
	}

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			try {
				await navigation.complete;
				if (direction) {
					window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
				}
			} finally {
				if (direction) {
					setTransitionDirection(null);
				}
			}
		});
	});
}

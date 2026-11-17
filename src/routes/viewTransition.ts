import { prefersReducedMotion } from 'svelte/motion';
import { onNavigate } from '$app/navigation';
import { setTransitionDirection, type TransitionDirection } from '$lib/document/root';

type Navigation = Parameters<Parameters<typeof onNavigate>[0]>[0];

function navigationDirection(navigation: Navigation): TransitionDirection | null {
	if (navigation.type !== 'link') return null;
	const trigger = navigation.event
		.composedPath()
		.find(
			(node): node is Element =>
				node instanceof Element && node.hasAttribute('data-direction'),
		);
	const direction = trigger?.getAttribute('data-direction');
	return direction === 'forward' || direction === 'backward' ? direction : null;
}

export function viewTransition(navigation: Navigation): Promise<void> | void {
	if (!document.startViewTransition || prefersReducedMotion.current) return;
	if (navigation.from?.url?.pathname === navigation.to?.url?.pathname) return;

	const direction = navigationDirection(navigation);
	setTransitionDirection(direction);

	const { promise, resolve } = Promise.withResolvers<void>();
	document.startViewTransition(async () => {
		resolve();
		try {
			await navigation.complete;
		} finally {
			setTransitionDirection(null);
		}
	});
	return promise;
}

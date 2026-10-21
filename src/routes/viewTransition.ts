import { prefersReducedMotion } from 'svelte/motion';
import { onNavigate } from '$app/navigation';

type Navigation = Parameters<Parameters<typeof onNavigate>[0]>[0];

export function viewTransition(navigation: Navigation): Promise<void> | void {
	if (!document.startViewTransition || prefersReducedMotion.current) return;
	if (navigation.from?.url?.pathname === navigation.to?.url?.pathname) return;

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
}

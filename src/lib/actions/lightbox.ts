import { lightbox } from '$lib/state/lightbox.svelte';

/**
 * Svelte action to automatically register zoom-in behaviors on all images
 * inside the wrapped container and trigger the global lightbox modal.
 */
export function lightboxAction(container: HTMLElement) {
	const updateImages = () => {
		const imgs = container.querySelectorAll<HTMLImageElement>('img');
		for (const img of imgs) {
			img.style.cursor = 'zoom-in';
		}
	};

	// Initialize styling
	updateImages();

	// Observe content mutations for dynamically loaded images (e.g. custom markup)
	const observer = new MutationObserver(updateImages);
	observer.observe(container, { childList: true, subtree: true });

	const handleClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.tagName === 'IMG') {
			const img = target as HTMLImageElement;
			lightbox.src = img.src;
			lightbox.alt = img.alt || '';
			lightbox.dialog.open = true;
		}
	};

	container.addEventListener('click', handleClick);

	return {
		destroy() {
			container.removeEventListener('click', handleClick);
			observer.disconnect();
		},
	};
}

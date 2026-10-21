import { Dialog } from 'melt/builders';

class LightboxState {
	dialog = new Dialog({
		// Page lock is the shared [data-scroll-lock] CSS rule, rendered by Lightbox.svelte.
		scrollLock: false,
		closeOnEscape: true,
		closeOnOutsideClick: true,
	});
	src = $state('');
	alt = $state('');
}

// Global reactive state for the image lightbox modal
export const lightbox = new LightboxState();

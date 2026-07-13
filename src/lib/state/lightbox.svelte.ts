import { Dialog } from 'melt/builders';

class LightboxState {
	dialog = new Dialog({
		scrollLock: true,
		closeOnEscape: true,
		closeOnOutsideClick: true,
	});
	src = $state('');
	alt = $state('');
}

// Global reactive state for the image lightbox modal
export const lightbox = new LightboxState();

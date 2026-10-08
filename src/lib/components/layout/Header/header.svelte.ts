import { headerChrome as policy } from '$lib/design-system/tokens/layout';
import { DismissibleCollapsible } from '$lib/ui/dismissibleCollapsible.svelte';
import { stepHeaderChrome } from '$lib/utils/headerChrome';

/**
 * Header chrome: hide-on-scroll + mobile nav shell.
 * Open/dismiss/scroll-lock via shared DismissibleCollapsible.
 */
export class SiteHeader {
	readonly nav = new DismissibleCollapsible({
		scrollLock: true,
		// Scrim is outside rootEl → document outside-click closes (like GearMenu)
		outsideClick: true,
		onOpenChange: (open, { y }) => {
			if (open) {
				this.hidden = false;
				this.elevated = true;
				this.#lastY = y;
			} else {
				this.#lastY = y;
				this.hidden = false;
				this.elevated = y > policy.elevateAfterPx;
			}
		},
	});

	hidden = $state(false);
	elevated = $state(false);
	#lastY = 0;
	#scrollInitialized = false;

	handleScroll = (y: number) => {
		if (!this.#scrollInitialized) {
			this.#lastY = y;
			this.elevated = y > policy.elevateAfterPx;
			this.#scrollInitialized = true;
			return;
		}
		this.#applyScroll(y);
	};

	#applyScroll(y: number) {
		if (this.nav.open) return;

		const el = document.activeElement;
		const focusInside =
			!!this.nav.rootEl &&
			el instanceof HTMLElement &&
			this.nav.rootEl.contains(el) &&
			el.matches(':focus-visible');

		const next = stepHeaderChrome(
			{ hidden: this.hidden, elevated: this.elevated },
			{ y, lastY: this.#lastY, menuOpen: false, focusInside },
		);
		this.hidden = next.hidden;
		this.elevated = next.elevated;
		this.#lastY = next.lastY;
	}

	close = () => this.nav.close();
}

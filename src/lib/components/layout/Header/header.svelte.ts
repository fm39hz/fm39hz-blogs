import { loadIcons } from '@iconify/svelte';
import { untrack } from 'svelte';
import { BP_MQ, headerChrome as policy } from '$lib/design-system/tokens/layout';
import { DismissibleCollapsible } from '$lib/ui/dismissibleCollapsible.svelte';
import { stepHeaderChrome } from '$lib/utils/headerChrome';

const ICONS = [
	'ph:gear',
	'ph:x',
	'ph:list',
	'ph:magnifying-glass',
	'ph:moon',
	'ph:sun',
	'ph:translate',
] as const;

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
	barH = $state(0);

	#lastY = 0;

	constructor() {
		if (typeof window !== 'undefined') {
			loadIcons([...ICONS]);
		}

		// Desktop: no mobile drawer
		$effect(() => {
			if (typeof window === 'undefined') return;
			const mq = window.matchMedia(BP_MQ.smUp);
			const sync = () => {
				if (mq.matches) this.nav.close();
			};
			sync();
			mq.addEventListener('change', sync);
			return () => mq.removeEventListener('change', sync);
		});

		// Hide-on-scroll
		$effect(() => {
			if (typeof window === 'undefined') return;
			this.#lastY = window.scrollY;
			const onScroll = () => untrack(() => this.#applyScroll(window.scrollY));
			window.addEventListener('scroll', onScroll, { passive: true });
			return () => window.removeEventListener('scroll', onScroll);
		});
	}

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

	setBarH = (h: number) => {
		this.barH = h;
	};

	close = () => this.nav.close();

	get barHeightStyle(): string | undefined {
		return this.barH > 0 ? `${this.barH}px` : undefined;
	}
}

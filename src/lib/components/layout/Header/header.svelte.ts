import { loadIcons } from '@iconify/svelte';
import { Collapsible } from 'melt/builders';
import { untrack } from 'svelte';
import { BP_MQ, headerChrome as policy } from '$lib/design-system/tokens/layout';
import { stepHeaderChrome } from '$lib/utils/headerChrome';
import { lockPageScroll } from '$lib/utils/scrollLock';

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
 * Site header chrome. Melt Collapsible owns open/a11y.
 * This class owns hide-on-scroll + drawer scroll-lock only.
 */
export class SiteHeader {
	readonly menu = new Collapsible();

	hidden = $state(false);
	elevated = $state(false);
	barH = $state(0);
	rootEl = $state<HTMLElement | undefined>(undefined);

	#lastY = 0;

	constructor() {
		if (typeof window !== 'undefined') {
			loadIcons([...ICONS]);
		}

		// Desktop: no drawer shell
		$effect(() => {
			if (typeof window === 'undefined') return;
			const mq = window.matchMedia(BP_MQ.smUp);
			const sync = () => {
				if (mq.matches) this.menu.open = false;
			};
			sync();
			mq.addEventListener('change', sync);
			return () => mq.removeEventListener('change', sync);
		});

		// Hide-on-scroll — listener only (untrack body so $effect does not thrash)
		$effect(() => {
			if (typeof window === 'undefined') return;

			this.#lastY = window.scrollY;

			const onScroll = () => {
				untrack(() => this.#applyScroll(window.scrollY));
			};

			window.addEventListener('scroll', onScroll, { passive: true });
			return () => window.removeEventListener('scroll', onScroll);
		});

		// Scroll-lock + Escape dismiss while Collapsible open
		$effect(() => {
			if (typeof window === 'undefined' || !this.menu.open) return;

			const handle = lockPageScroll();
			this.hidden = false;
			this.elevated = true;
			this.#lastY = handle.y;

			const onKey = (e: KeyboardEvent) => {
				if (e.key === 'Escape') this.close();
			};
			window.addEventListener('keydown', onKey);

			return () => {
				window.removeEventListener('keydown', onKey);
				const y = handle.y;
				handle.release();
				this.#lastY = y;
				this.hidden = false;
				this.elevated = y > policy.elevateAfterPx;
			};
		});
	}

	#applyScroll(y: number) {
		if (this.menu.open) return;

		// Keyboard :focus-visible only — mouse focus on hamburger must not pin
		const el = document.activeElement;
		const focusInside =
			!!this.rootEl &&
			el instanceof HTMLElement &&
			this.rootEl.contains(el) &&
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

	close = () => {
		this.menu.open = false;
	};

	get barHeightStyle(): string | undefined {
		return this.barH > 0 ? `${this.barH}px` : undefined;
	}
}

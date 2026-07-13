import { headerChrome as policy } from '$lib/design-system/tokens/layout';

export type ChromeFlags = {
	/** Mobile: translate chrome off-screen */
	hidden: boolean;
	/** Shadow once past elevate threshold (or menu open) */
	elevated: boolean;
};

export type ChromeInput = {
	y: number;
	lastY: number;
	menuOpen: boolean;
	focusInside: boolean;
};

/**
 * Pure hide-on-scroll step. Policy from design-system tokens/layout.
 * Thresholds absorb micro-jitter; lastY only advances on committed moves
 * or pin states so the next delta is measured from a stable baseline.
 */
export function stepHeaderChrome(
	prev: ChromeFlags,
	input: ChromeInput,
): ChromeFlags & { lastY: number } {
	const { y, lastY, menuOpen, focusInside } = input;
	const elevated = y > policy.elevateAfterPx || menuOpen;

	if (menuOpen || focusInside) {
		return { hidden: false, elevated, lastY: y };
	}

	if (y <= 0) {
		return { hidden: false, elevated, lastY: y };
	}

	const delta = y - lastY;

	if (delta > policy.hideDeltaPx && y > policy.hideFloorPx) {
		return { hidden: true, elevated, lastY: y };
	}

	if (delta < -policy.showDeltaPx) {
		return { hidden: false, elevated, lastY: y };
	}

	return { hidden: prev.hidden, elevated, lastY };
}

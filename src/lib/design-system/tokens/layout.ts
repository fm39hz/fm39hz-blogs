/**
 * Layout tokens — single source for breakpoints / stacking / chrome.
 * SCSS media queries mirror BP values (see Header.module.scss, global.scss).
 */

export const BP = {
	/** Mobile ↔ tablet/desktop shell switch (header nav, type scale step) */
	sm: 640,
	/** Large type scale */
	lg: 1024,
} as const;

export const BP_MQ = {
	smUp: `(width >= ${BP.sm}px)`,
	smDown: `(width < ${BP.sm}px)`,
	lgUp: `(width >= ${BP.lg}px)`,
} as const;

/** z-index ladder — keep in sync with global.scss :root */
export const zIndex = {
	base: 0,
	raised: 10,
	dropdown: 100,
	sticky: 200,
	modal: 300,
	toast: 400,
} as const;

export const layout = {
	'--mw': '48rem',
	'--z-base': String(zIndex.base),
	'--z-raised': String(zIndex.raised),
	'--z-dropdown': String(zIndex.dropdown),
	'--z-sticky': String(zIndex.sticky),
	'--z-modal': String(zIndex.modal),
	'--z-toast': String(zIndex.toast),
	'--bp-sm': `${BP.sm}px`,
	'--bp-lg': `${BP.lg}px`,
} as const;

/** Mobile header hide-on-scroll policy */
export const headerChrome = {
	/** Shadow / elevated once past this Y */
	elevateAfterPx: 20,
	/** Never hide above this Y */
	hideFloorPx: 80,
	/** Downward delta before hide */
	hideDeltaPx: 12,
	/** Upward delta before show */
	showDeltaPx: 6,
} as const;

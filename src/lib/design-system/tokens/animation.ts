/** Single source for CSS vars + JS motion. Keep global.scss :root in sync. */

export const AnimEasing = {
	out: [0.22, 1, 0.36, 1] as const,
	bounce: [0.34, 1.56, 0.64, 1] as const,
	/** @deprecated use `out` */
	EASE_OUT_QUART: [0.22, 1, 0.36, 1] as const,
} as const;

/** Seconds — motion/mini + logic */
export const AnimDuration = {
	fast: 0.15,
	normal: 0.2,
	enter: 0.25,
	slow: 0.3,
	page: 0.35,
	scene: 0.5,
	theme: 0.55,
} as const;

/** Milliseconds — setTimeout / 3rd-party APIs */
export const AnimDurationMs = {
	fast: AnimDuration.fast * 1000,
	normal: AnimDuration.normal * 1000,
	enter: AnimDuration.enter * 1000,
	slow: AnimDuration.slow * 1000,
	page: AnimDuration.page * 1000,
	scene: AnimDuration.scene * 1000,
	theme: AnimDuration.theme * 1000,
} as const;

export const easings = {
	'--ease-out': `cubic-bezier(${AnimEasing.out.join(', ')})`,
	'--ease-bounce': `cubic-bezier(${AnimEasing.bounce.join(', ')})`,
} as const;

export const durations = {
	'--d-fast': `${AnimDuration.fast}s`,
	'--d-normal': `${AnimDuration.normal}s`,
	'--d-enter': `${AnimDuration.enter}s`,
	'--d-slow': `${AnimDuration.slow}s`,
	'--d-page': `${AnimDuration.page}s`,
	'--d-scene': `${AnimDuration.scene}s`,
	'--d-theme': `${AnimDuration.theme}s`,
} as const;

export const scales = {
	'--scale-hover': '1.1',
	'--scale-active': '0.95',
	'--scale-pop': '1.15',
} as const;

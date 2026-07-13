/**
 * Typography stack — handwriting irregularity lives in the FONT (glyph shaping),
 * not in DOM letter-splitting. Vietnamese subsets must load (see layout font URL).
 *
 * Verified Google Fonts CSS subsets (2026):
 * - Sriracha: thai | vietnamese | latin-ext | latin
 * - Borel:    math | symbols | vietnamese | latin-ext | latin
 *
 * OpenType on the web: prefer calt/liga/ssXX. Do not rely on `rand`.
 * Visual VI audit still required (diacritic stacking on script faces).
 */

export const fonts = {
	'--font-body': "'Sriracha', cursive",
	'--font-handwriting': "'Borel', cursive",
} as const;

/** Features applied to handwriting surfaces (blockquote, .hand) */
export const handwritingFeatures = {
	/** CSS font-feature-settings value */
	css: '"calt" 1, "liga" 1',
} as const;

export const fontSizes = {
	'--fs-xs': '0.75rem',
	'--fs-sm': '0.875rem',
	'--fs-base': '1rem',
	'--fs-lg': '1.125rem',
	'--fs-xl': '1.25rem',
	'--fs-2xl': '1.5rem',
	'--fs-3xl': '1.75rem',
	'--fs-4xl': '2.25rem',
} as const;

export const lineHeights = {
	'--lh-tight': '1.25',
	'--lh-normal': '1.75',
} as const;

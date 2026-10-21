/**
 * Webfont source. The families are the ones the CSS font tokens name
 * (`--font-body` Sriracha, `--font-handwriting` Borel, `--font-mono`
 * JetBrains Mono); the root layout loads the stylesheet and the diagram PNG
 * export asks the same CSS API for a glyph subset.
 *
 * Google's CSS already ships the `vietnamese` unicode-range subsets — do not
 * strip them. Handwriting irregularity lives in the glyphs, not DOM spans.
 */

/** Stylesheet API host (also queried with `text=` for export subsets). */
export const FONT_CSS_API = 'https://fonts.googleapis.com/css2';
export const FONT_CSS_ORIGIN = 'https://fonts.googleapis.com';
/** Font files are served from here; preconnect needs `crossorigin`. */
export const FONT_FILE_ORIGIN = 'https://fonts.gstatic.com';

const FAMILIES = [
	'Sriracha',
	'Borel',
	'JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500',
];

export const SITE_FONT_STYLESHEET = `${FONT_CSS_API}?${FAMILIES.map((family) => `family=${family}`).join('&')}&display=swap`;

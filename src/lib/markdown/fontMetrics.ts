/**
 * Build-time text width for diagram renderers (pele, Vega). Node has no
 * canvas, and the renderers' fallback metrics assume a generic sans-serif;
 * labels paint in Sriracha (`--diagram-font`), which is much wider and would
 * overflow their boxes. This is the single build-time knowledge of that token.
 *
 * `sriracha-metrics.json`: advance widths in 1/1000 em, extracted with fontkit
 * from Google Fonts `ofl/sriracha/Sriracha-Regular.ttf` (Version 1.002g,
 * no kern table, so advances are exact). Regenerate if the webfont changes.
 */

import metrics from './sriracha-metrics.json';

/** Sriracha ships no bold face; synthetic bold renders slightly wider. */
const SYNTHETIC_BOLD = 1.05;
/** `--diagram-font-mono` (JetBrains Mono) advance (1/1000 em). */
const MONO_ADVANCE = 600;

const widths: Record<string, number> = metrics.widths;

export function textWidth(
	text: string,
	size: number,
	{ bold = false, mono = false }: { bold?: boolean; mono?: boolean } = {},
): number {
	let units = 0;
	for (const ch of text.normalize('NFC')) {
		units += mono ? MONO_ADVANCE : (widths[ch.codePointAt(0) ?? 0] ?? metrics.fallback);
	}
	const scale = bold && !mono ? SYNTHETIC_BOLD : 1;
	return (units / metrics.unitsPerEm) * size * scale;
}

/**
 * Diagram viewport width in CSS px at the widest layout (`--mw` column at the
 * `lg` root size, measured inside the figure's padding). Renderers lay out to
 * fit, so the SVG paints near 1:1 instead of being scaled down after the fact.
 * Re-measure if `--mw` or the figure padding changes.
 */
export const DIAGRAM_MAX_WIDTH = 836;

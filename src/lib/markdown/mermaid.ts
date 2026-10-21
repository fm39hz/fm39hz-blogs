/**
 * Build-time Mermaid → SVG via pele (no DOM, no client runtime).
 *
 * pele lays out text with a width measurer. In Node there is no canvas, so its
 * default metrics assume a generic sans-serif; our labels paint in Sriracha
 * (`--font-body`), which is much wider and would overflow the boxes. We feed
 * pele the real advance widths instead.
 *
 * `sriracha-metrics.json`: advance widths in 1/1000 em, extracted with fontkit
 * from Google Fonts `ofl/sriracha/Sriracha-Regular.ttf` (Version 1.002g,
 * no kern table, so advances are exact). Regenerate if the webfont changes.
 *
 * Colors are not baked: pele emits `var(--pele-*)`, mapped to site tokens in
 * `prose.scss`, so theme toggles repaint without re-rendering.
 */

import { createHash } from 'node:crypto';
import { render } from 'pele';
import type { TextMeasurer } from 'pele/core';
import metrics from './sriracha-metrics.json';

const STYLE_BOLD = 1;
const STYLE_MONO = 4;
/** Sriracha ships no bold face; synthetic bold renders slightly wider. */
const SYNTHETIC_BOLD = 1.05;
/** JetBrains Mono advance (1/1000 em). */
const MONO_ADVANCE = 600;
/**
 * Diagram viewport width in CSS px at the widest layout (`--mw` column at the
 * `lg` root size, measured inside the figure's padding). pele wraps labels and
 * tightens layout to fit, so the SVG paints near 1:1 instead of being scaled
 * down after the fact. Re-measure if `--mw` or the figure padding changes.
 */
const DIAGRAM_MAX_WIDTH = 836;

const widths: Record<string, number> = metrics.widths;

const srirachaMeasurer: TextMeasurer = {
	width(text, size, style) {
		let units = 0;
		for (const ch of text.normalize('NFC')) {
			const cp = ch.codePointAt(0) ?? 0;
			units += style & STYLE_MONO ? MONO_ADVANCE : (widths[cp] ?? metrics.fallback);
		}
		const scale = style & STYLE_BOLD && !(style & STYLE_MONO) ? SYNTHETIC_BOLD : 1;
		return (units / metrics.unitsPerEm) * size * scale;
	},
};

/**
 * Mermaid authored for mermaid.js often uses `<br/>` line breaks; pele parses
 * them natively, so the source passes through unchanged.
 * Throws on invalid source so a broken diagram fails the build instead of shipping.
 */
export function renderMermaidSvg(source: string): string {
	// stable per-diagram prefix: marker/clip ids stay unique on a page and across builds
	const idPrefix = `mmd-${createHash('sha1').update(source).digest('hex').slice(0, 8)}-`;
	const { svg } = render(source, {
		measurer: srirachaMeasurer,
		fontFamily: 'Sriracha, cursive',
		fontFamilyMono: "'JetBrains Mono', ui-monospace, monospace",
		idPrefix,
		maxWidth: DIAGRAM_MAX_WIDTH,
	});
	return svg;
}

/**
 * Build-time Mermaid → SVG via pele (no DOM, no client runtime).
 *
 * Colors and font families are not baked: pele emits `var(--pele-*)`, aliased
 * to the `--diagram-*` tokens, so theme toggles repaint without re-rendering.
 */

import { createHash } from 'node:crypto';
import { render } from 'pele';
import type { TextMeasurer } from 'pele/core';
import type { DiagramArt } from '../components/content/contract';
import { diagramArt } from './diagramArt';
import { DIAGRAM_MAX_WIDTH, textWidth } from './fontMetrics';

const STYLE_BOLD = 1;
const STYLE_MONO = 4;

const measurer: TextMeasurer = {
	width: (text, size, style) =>
		textWidth(text, size, { bold: !!(style & STYLE_BOLD), mono: !!(style & STYLE_MONO) }),
};

/**
 * Mermaid authored for mermaid.js often uses `<br/>` line breaks; pele parses
 * them natively, so the source passes through unchanged.
 * Throws on invalid source so a broken diagram fails the build instead of shipping.
 */
export function renderMermaidArt(source: string): DiagramArt {
	// stable per-diagram prefix: marker/clip ids stay unique on a page and across builds
	const idPrefix = `mmd-${createHash('sha1').update(source).digest('hex').slice(0, 8)}-`;
	const { svg } = render(source, {
		measurer,
		idPrefix,
		maxWidth: DIAGRAM_MAX_WIDTH,
	});
	return diagramArt(svg);
}

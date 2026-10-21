/**
 * Build-time Vega-Lite → SVG (headless View, no DOM, no client runtime).
 *
 * Chrome and categorical colors are `var(--diagram-*)` references, so charts
 * follow theme toggles like pele diagrams. Continuous color schemes keep
 * Vega's literal palettes: interpolation needs real colors, not references.
 */

import { parse, textMetrics, View } from 'vega';
import { compile, type TopLevelSpec } from 'vega-lite';
import { textWidth } from './fontMetrics';

const token = (name: string) => `var(--diagram-${name})`;

type TextItem = { text?: unknown; fontSize?: number; fontWeight?: string | number };

// Exported at runtime (vega re-exports vega-scenegraph) but missing from vega's typings.
declare module 'vega' {
	export const textMetrics: { width: (item: TextItem, text?: unknown) => number };
}

const config = {
	background: 'transparent',
	font: token('font'),
	axis: {
		domainColor: token('line'),
		gridColor: token('grid'),
		gridOpacity: 0.35,
		labelColor: token('text'),
		titleColor: token('text'),
		tickColor: token('line'),
		labelFontSize: 11,
		titleFontSize: 12,
	},
	legend: { labelColor: token('text'), titleColor: token('text') },
	title: { color: token('text') },
	view: { stroke: null },
	range: { category: [1, 2, 3, 4].map((n) => token(`series-${n}`)) },
	mark: { color: token('series-1') },
	rule: { color: token('line'), strokeWidth: 2 },
	text: { color: token('text'), fontSize: 12 },
};

// Vega lays out labels with textMetrics.width; without a canvas it guesses 0.8em/char.
textMetrics.width = (item: TextItem, text?: unknown) => {
	const value = text ?? item.text;
	const str = Array.isArray(value) ? value.join(' ') : String(value ?? '');
	const weight = item.fontWeight;
	const bold = weight === 'bold' || (typeof weight === 'number' && weight >= 600);
	return textWidth(str, item.fontSize ?? 11, { bold });
};

/** Throws on invalid JSON or spec so a broken chart fails the build instead of shipping. */
export async function renderVegaLiteSvg(source: string): Promise<{ svg: string; label: string }> {
	const spec = JSON.parse(source) as TopLevelSpec & { description?: string };
	const view = new View(parse(compile(spec, { config }).spec), { renderer: 'none' });
	try {
		return { svg: await view.toSVG(), label: spec.description || 'Chart' };
	} finally {
		view.finalize();
	}
}

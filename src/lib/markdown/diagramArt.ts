/**
 * Build-time facts about a prerendered diagram SVG, parsed as hast (not
 * regexed as text), so the client receives typed data instead of re-parsing
 * markup to export it.
 */

import type { Element, Nodes } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { toString as textOf } from 'hast-util-to-string';
import type { DiagramArt } from '../components/content/contract';
import { DIAGRAM_FONT_FAMILY } from './fontMetrics';

/** Custom-property references inside one CSS value (`fill="var(--x)"`, `style`). */
const VAR_REF = /var\(\s*(--[\w-]+)/g;

function walk(node: Nodes, visit: (element: Element) => void) {
	if (node.type === 'element') visit(node);
	if ('children' in node) for (const child of node.children) walk(child, visit);
}

export function diagramArt(svg: string): DiagramArt {
	const tree = fromHtml(svg, { fragment: true, space: 'svg' });
	const root = tree.children.find(
		(node): node is Element => node.type === 'element' && node.tagName === 'svg',
	);
	if (!root) throw new Error('diagramArt: renderer output has no <svg> root');

	const paint = new Set<string>();
	walk(root, (element) => {
		for (const value of Object.values(element.properties)) {
			if (typeof value !== 'string') continue;
			for (const [, name] of value.matchAll(VAR_REF)) paint.add(name);
		}
	});

	const glyphs = [...new Set(textOf(root).replace(/\s/g, ''))].sort().join('');

	return {
		svg,
		width: Number(root.properties.width),
		height: Number(root.properties.height),
		paint: [...paint].sort(),
		font: { family: DIAGRAM_FONT_FAMILY, glyphs },
	};
}

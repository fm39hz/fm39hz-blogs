/**
 * Build-time: replace [x] / [ ] / [/] in <td> text with inline SVG.
 * Kills runtime `styleCheckboxes` action + innerHTML.
 */

import type { Element, Nodes, Parents, Root, Text } from 'hast';
import type {} from 'mdast-util-to-hast';

function svgFor(type: 'full' | 'empty' | 'half'): string {
	if (type === 'full') {
		return `<svg class="cb" viewBox="0 0 24 24" aria-label="Checked"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 12.5l3.5 3.5 6.5-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
	}
	if (type === 'half') {
		return `<svg class="cb" viewBox="0 0 24 24" aria-label="Intermediate"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 18L18 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
	}
	return `<svg class="cb" viewBox="0 0 24 24" aria-label="Unchecked"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
}

const CHECKBOX_RE = /^\[\s*([x/]?)\s*\]$/;

export function rehypeTableCellCheckboxes() {
	return (tree: Root) => {
		const walk = (node: Nodes) => {
			if (isTableCell(node)) {
				const children = node.children;
				if (children.length === 1 && children[0].type === 'text') {
					const text = children[0].value;
					const m = text.trim().match(CHECKBOX_RE);
					if (m) {
						const type = m[1] === 'x' ? 'full' : m[1] === '/' ? 'half' : 'empty';
						node.properties.style = 'text-align:center;vertical-align:middle;';
						node.children = [{ type: 'raw', value: svgFor(type) }];
					}
				}
			}
			if (isParent(node)) {
				for (const child of node.children) walk(child);
			}
		};
		walk(tree);
	};
}

function isTableCell(node: Nodes): node is Element & { children: [Text] | Element['children'] } {
	return node.type === 'element' && (node.tagName === 'td' || node.tagName === 'th');
}

function isParent(node: Nodes): node is Parents {
	return 'children' in node;
}

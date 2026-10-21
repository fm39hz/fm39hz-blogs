/**
 * remark-footnotes v2 (the variant mdsvex's bundled remark-parse 8 can use)
 * labels a reference with its identifier (`[^note]` → "note"). GFM readers
 * expect numbers, so rewrite each `a.footnote-ref` to its order in the
 * footnote list, which the same pass emits in first-reference order.
 */

import type { Element, Nodes, Root } from 'hast';

function isFootnoteRef(node: Nodes): node is Element {
	if (node.type !== 'element' || node.tagName !== 'a') return false;
	const className = node.properties.className;
	return Array.isArray(className) && className.includes('footnote-ref');
}

export function rehypeFootnoteNumbers() {
	return (tree: Root) => {
		const order: string[] = [];
		const walk = (node: Nodes) => {
			if (isFootnoteRef(node)) {
				const target = String(node.properties.href ?? '');
				if (!order.includes(target)) order.push(target);
				node.children = [{ type: 'text', value: String(order.indexOf(target) + 1) }];
			}
			if ('children' in node) for (const child of node.children) walk(child);
		};
		walk(tree);
	};
}

/**
 * Shared hast helpers for the build-time rehype plugins and diagram parsing.
 * Build-safe (vite.config loads the plugins): type-only imports.
 */

import type { Element, Nodes, Parents } from 'hast';

export function isParent(node: Nodes): node is Parents {
	return 'children' in node;
}

/** An element, optionally restricted to the given tag names. */
export function isElement(node: Nodes, ...tagNames: string[]): node is Element {
	return node.type === 'element' && (tagNames.length === 0 || tagNames.includes(node.tagName));
}

export function hasClass(element: Element, name: string): boolean {
	const className = element.properties.className;
	return Array.isArray(className) && className.includes(name);
}

/**
 * Pre-order walk over every element. `visit` may replace the element's
 * children; the walk then descends into the new children.
 */
export function visitElements(node: Nodes, visit: (element: Element) => void): void {
	if (node.type === 'element') visit(node);
	if (isParent(node)) for (const child of node.children) visitElements(child, visit);
}

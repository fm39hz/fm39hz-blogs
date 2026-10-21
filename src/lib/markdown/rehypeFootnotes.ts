/**
 * Footnote references become `Components.FootnoteRef` (hover/click popup) with
 * the footnote body inlined at build time; the footnote list stays at the end
 * of the article as the no-JS target and print fallback.
 *
 * Input is remark-footnotes v2 output (mdsvex's bundled remark-parse 8):
 *   <sup id="fnref-x"><a class="footnote-ref" href="#fn-x">x</a></sup>
 *   <div class="footnotes"><ol><li id="fn-x">…<a class="footnote-backref">↩</a></li></ol></div>
 * References are numbered by first appearance (GFM style) instead of showing `x`.
 */

import type { ElementContent, Root } from 'hast';
import { toHtml } from 'hast-util-to-html';
import type {} from 'mdast-util-to-hast';
import { emitComponent } from '../components/content/contract';
import { hasClass, isElement, visitElements } from './hast';

const REF_PREFIX = 'fnref-';
const ITEM_PREFIX = 'fn-';

/** Popup bodies stay phrasing content: paragraphs become block-styled spans. */
function inline(node: ElementContent): ElementContent {
	if (node.type !== 'element') return node;
	const children = node.children
		.filter((child) => !(isElement(child, 'a') && hasClass(child, 'footnote-backref')))
		.map(inline);
	const { id: _id, ...properties } = node.properties;
	return {
		...node,
		children,
		properties,
		...(node.tagName === 'p'
			? { tagName: 'span', properties: { ...properties, dataFnParagraph: '' } }
			: {}),
	};
}

function footnoteBodies(tree: Root): Map<string, string> {
	const bodies = new Map<string, string>();
	visitElements(tree, (item) => {
		const id = String(item.properties.id ?? '');
		if (!isElement(item, 'li') || !id.startsWith(ITEM_PREFIX)) return;
		const content = item.children
			.filter((child) => !(isElement(child, 'a') && hasClass(child, 'footnote-backref')))
			.map(inline);
		bodies.set(
			id.slice(ITEM_PREFIX.length),
			toHtml({ type: 'root', children: content }, { allowDangerousHtml: true }).trim(),
		);
	});
	return bodies;
}

export function rehypeFootnotes() {
	return (tree: Root) => {
		const bodies = footnoteBodies(tree);
		const order: string[] = [];
		visitElements(tree, (sup) => {
			const refId = String(sup.properties.id ?? '');
			if (!isElement(sup, 'sup') || !refId.startsWith(REF_PREFIX)) return;
			const link = sup.children.find(
				(child) => isElement(child, 'a') && hasClass(child, 'footnote-ref'),
			);
			if (!link || !isElement(link)) return;
			const href = String(link.properties.href ?? '');
			if (!href.startsWith(`#${ITEM_PREFIX}`)) return;
			const id = href.slice(ITEM_PREFIX.length + 1);
			const html = bodies.get(id);
			if (html === undefined) return;
			if (!order.includes(id)) order.push(id);
			const number = order.indexOf(id) + 1;
			sup.children = [
				{ type: 'raw', value: emitComponent('FootnoteRef', { number, id, html }) },
			];
		});
	};
}

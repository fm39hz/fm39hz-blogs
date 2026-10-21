/**
 * Add responsive table labels to the canonical table. The companion mobile
 * card view is generated from the same syntax tree at build time.
 */

import type { Element, Root } from 'hast';
import { toString as textOf } from 'hast-util-to-string';
import { isElement, visitElements } from './hast';

function rowCells(tr: Element, tag: 'th' | 'td'): Element[] {
	return tr.children.filter((child): child is Element => isElement(child, tag));
}

function headerLabels(table: Element): string[] {
	const children = table.children;
	const thead = children.find((child): child is Element => isElement(child, 'thead'));
	if (thead) {
		const tr = thead.children.find((child): child is Element => isElement(child, 'tr'));
		if (tr) return rowCells(tr, 'th').map((th) => textOf(th).trim());
	}
	// GFM often: first body row is header cells
	const tbody = children.find((child): child is Element => isElement(child, 'tbody')) ?? table;
	const firstTr = tbody.children.find((child): child is Element => isElement(child, 'tr'));
	if (!firstTr) return [];
	const ths = rowCells(firstTr, 'th');
	if (ths.length) return ths.map((th) => textOf(th).trim());
	return [];
}

function bodyRows(table: Element): Element[] {
	const children = table.children;
	const tbody = children.find((child): child is Element => isElement(child, 'tbody'));
	const root = tbody ?? table;
	return root.children.filter((child): child is Element => {
		if (!isElement(child, 'tr')) return false;
		// skip pure header rows
		if (rowCells(child, 'th').length && !rowCells(child, 'td').length) return false;
		return rowCells(child, 'td').length > 0;
	});
}

export function rehypeTableLabels() {
	return (tree: Root) => {
		visitElements(tree, (node) => {
			if (isElement(node, 'table')) {
				const labels = headerLabels(node);
				if (labels.length) {
					const className = node.properties.className;
					node.properties.className = [
						...new Set([
							...(Array.isArray(className)
								? className.filter(
										(value): value is string => typeof value === 'string',
									)
								: typeof className === 'string'
									? [className]
									: []),
							'prose-table',
						]),
					];
					for (const tr of bodyRows(node)) {
						const tds = rowCells(tr, 'td');
						tds.forEach((td, i) => {
							const label = labels[i];
							if (!label) return;
							if (!td.properties.dataLabel && !td.properties['data-label']) {
								td.properties.dataLabel = label;
							}
						});
					}
				}
			}
		});
	};
}

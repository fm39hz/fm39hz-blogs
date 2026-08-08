/**
 * One semantic <table> SSOT: stamp th text onto td[data-label] for CSS stack layout.
 * No second DOM tree. Labels are attributes (not duplicated prose nodes).
 */

import type { Element, Nodes, Parents, Root } from 'hast';

function textOf(node: Nodes): string {
	if (node.type === 'text') return String(node.value ?? '');
	if (!isParent(node)) return '';
	return node.children.map(textOf).join('');
}

function isElement(node: Nodes, tag: string): node is Element {
	return node.type === 'element' && node.tagName === tag;
}

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
		const walk = (node: Nodes) => {
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
			if (isParent(node)) {
				for (const child of node.children) walk(child);
			}
		};
		walk(tree);
	};
}

function isParent(node: Nodes): node is Parents {
	return 'children' in node;
}

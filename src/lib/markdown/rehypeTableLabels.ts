/**
 * One semantic <table> SSOT: stamp th text onto td[data-label] for CSS stack layout.
 * No second DOM tree. Labels are attributes (not duplicated prose nodes).
 */
// biome-ignore lint/suspicious/noExplicitAny: hast tree untyped in mdsvex pipeline
type Hast = any;

function textOf(node: Hast): string {
	if (!node) return '';
	if (node.type === 'text') return String(node.value ?? '');
	if (!node.children) return '';
	return node.children.map(textOf).join('');
}

function isElement(node: Hast, tag: string): boolean {
	return node?.type === 'element' && node.tagName === tag;
}

function rowCells(tr: Hast, tag: 'th' | 'td'): Hast[] {
	return (tr.children ?? []).filter((c: Hast) => isElement(c, tag));
}

function headerLabels(table: Hast): string[] {
	const children = table.children ?? [];
	const thead = children.find((c: Hast) => isElement(c, 'thead'));
	if (thead) {
		const tr = (thead.children ?? []).find((c: Hast) => isElement(c, 'tr'));
		if (tr) return rowCells(tr, 'th').map((th) => textOf(th).trim());
	}
	// GFM often: first body row is header cells
	const tbody = children.find((c: Hast) => isElement(c, 'tbody')) ?? table;
	const firstTr = (tbody.children ?? []).find((c: Hast) => isElement(c, 'tr'));
	if (!firstTr) return [];
	const ths = rowCells(firstTr, 'th');
	if (ths.length) return ths.map((th) => textOf(th).trim());
	return [];
}

function bodyRows(table: Hast): Hast[] {
	const children = table.children ?? [];
	const tbody = children.find((c: Hast) => isElement(c, 'tbody'));
	const root = tbody ?? table;
	return (root.children ?? []).filter((c: Hast) => {
		if (!isElement(c, 'tr')) return false;
		// skip pure header rows
		if (rowCells(c, 'th').length && !rowCells(c, 'td').length) return false;
		return rowCells(c, 'td').length > 0;
	});
}

// biome-ignore lint/suspicious/noExplicitAny: rehype plugin factory
export function rehypeTableLabels() {
	return (tree: Hast) => {
		const walk = (node: Hast) => {
			if (isElement(node, 'table')) {
				const labels = headerLabels(node);
				if (labels.length) {
					node.properties = node.properties ?? {};
					node.properties.className = [
						...new Set([
							...(Array.isArray(node.properties.className)
								? node.properties.className
								: node.properties.className
									? [node.properties.className]
									: []),
							'prose-table',
						]),
					];
					for (const tr of bodyRows(node)) {
						const tds = rowCells(tr, 'td');
						tds.forEach((td, i) => {
							const label = labels[i];
							if (!label) return;
							td.properties = td.properties ?? {};
							if (!td.properties.dataLabel && !td.properties['data-label']) {
								td.properties.dataLabel = label;
							}
						});
					}
				}
			}
			for (const child of node.children ?? []) walk(child);
		};
		walk(tree);
	};
}

import type { Element, ElementContent, Nodes, Parents, Root } from 'hast';
import { toHtml } from 'hast-util-to-html';

function isElement(node: Nodes, tagName: string): node is Element {
	return node.type === 'element' && node.tagName === tagName;
}

function isParent(node: Nodes): node is Parents {
	return 'children' in node;
}

function tableData(table: Element): { headers: string[]; rows: string[][] } | null {
	const thead = table.children.find((node): node is Element => isElement(node, 'thead'));
	const headRow = thead?.children.find((node): node is Element => isElement(node, 'tr'));
	const headerRow =
		headRow ??
		table.children
			.flatMap((node) => (isElement(node, 'tbody') ? node.children : [node]))
			.find((node): node is Element => isElement(node, 'tr'));
	if (!headerRow) return null;
	const headers = headerRow.children
		.filter((node): node is Element => isElement(node, 'th'))
		.map((cell) =>
			toHtml({ type: 'root', children: cell.children }, { allowDangerousHtml: true }).trim(),
		);
	if (headers.length === 0) return null;

	const tbody = table.children.find((node): node is Element => isElement(node, 'tbody'));
	const candidates = tbody?.children ?? table.children;
	const rows = candidates
		.filter((node): node is Element => isElement(node, 'tr'))
		.flatMap((row) => {
			const cells = row.children.filter((node): node is Element => isElement(node, 'td'));
			if (cells.length === 0) return [];
			return [
				cells.map((cell) =>
					toHtml(
						{ type: 'root', children: cell.children },
						{ allowDangerousHtml: true },
					).trim(),
				),
			];
		});
	return rows.length ? { headers, rows } : null;
}

/**
 * Compile mobile card data into the mdsvex component tree; no client-side DOM extraction.
 * `Components.TableCardStack` comes from the content layout's named exports.
 */
export function rehypeResponsiveTables() {
	return (tree: Root) => {
		const walk = (parent: Parents) => {
			for (let index = 0; index < parent.children.length; index++) {
				const child = parent.children[index];
				if (isElement(child, 'table')) {
					const data = tableData(child);
					if (data) {
						const component = `<div class="responsive-card-stack"><Components.TableCardStack headers={${JSON.stringify(data.headers)}} rows={${JSON.stringify(data.rows)}} /></div>`;
						parent.children.splice(index, 0, {
							type: 'raw',
							value: component,
						} as unknown as ElementContent);
						index++;
					}
				}
				if (isParent(child)) walk(child);
			}
		};

		walk(tree);
	};
}

import type { Element, ElementContent, Nodes, Parents, Root } from 'hast';
import { toHtml } from 'hast-util-to-html';
import { toString as textOf } from 'hast-util-to-string';
import type {} from 'mdast-util-to-hast';
import {
	type CardCell,
	type CellStatus,
	type CheckState,
	emitComponent,
	isCheckState,
	type TableCardStackProps,
} from '../components/content/contract';

/** Cell words that read as a yes/no answer (both content languages). */
const ACTIVE_WORDS = new Set(['yes', 'true', '✓', 'v', 'có', 'checked']);
const INACTIVE_WORDS = new Set(['no', 'false', '✗', 'x', '-', '—', 'không', 'unchecked']);
/** Text this short is a value, not prose. */
const SHORT_CELL = 6;
/** Share of short/yes-no cells that makes a table a comparison grid. */
const COMPARISON_RATIO = 0.8;

function isElement(node: Nodes, tagName: string): node is Element {
	return node.type === 'element' && node.tagName === tagName;
}

function isParent(node: Nodes): node is Parents {
	return 'children' in node;
}

function cellHtml(cell: Element): string {
	return toHtml({ type: 'root', children: cell.children }, { allowDangerousHtml: true }).trim();
}

function cellStatus(text: string): CellStatus {
	if (ACTIVE_WORDS.has(text)) return 'active';
	if (INACTIVE_WORDS.has(text)) return 'inactive';
	return 'neutral';
}

const STATUS_BY_CHECK: Record<CheckState, CellStatus> = {
	done: 'active',
	partial: 'neutral',
	todo: 'inactive',
};

/** Card cell; checkbox cells carry their state instead of component markup. */
function cardCell(cell: Element): CardCell {
	const check = cell.properties.dataCheck;
	if (isCheckState(check)) return { html: '', status: STATUS_BY_CHECK[check], check };
	return { html: cellHtml(cell), status: cellStatus(textOf(cell).trim().toLowerCase()) };
}

function tableData(table: Element): TableCardStackProps | null {
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
		.map(cellHtml);
	if (headers.length === 0) return null;

	const tbody = table.children.find((node): node is Element => isElement(node, 'tbody'));
	const candidates = tbody?.children ?? table.children;
	let short = 0;
	let compared = 0;
	const rows = candidates
		.filter((node): node is Element => isElement(node, 'tr'))
		.flatMap((row): CardCell[][] => {
			const cells = row.children.filter((node): node is Element => isElement(node, 'td'));
			if (cells.length === 0) return [];
			return [
				cells.map((cell, column) => {
					const card = cardCell(cell);
					if (column > 0) {
						compared++;
						const text = textOf(cell).trim();
						if (card.check || text.length <= SHORT_CELL || card.status !== 'neutral')
							short++;
					}
					return card;
				}),
			];
		});
	if (rows.length === 0) return null;
	return { headers, rows, comparison: compared > 0 && short / compared >= COMPARISON_RATIO };
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
						const card: ElementContent = {
							type: 'raw',
							value: `<div class="responsive-card-stack">${emitComponent('TableCardStack', data)}</div>`,
						};
						parent.children.splice(index, 0, card);
						index++;
					}
				}
				if (isParent(child)) walk(child);
			}
		};

		walk(tree);
	};
}

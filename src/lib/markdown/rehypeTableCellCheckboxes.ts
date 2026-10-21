/**
 * Build-time: replace [x] / [/] / [ ] in table cells with the CellCheck
 * component (layout export). Alignment comes from the `checkCell` class in
 * prose.scss, not an inline style.
 */

import type { Element, Nodes, Parents, Root } from 'hast';
import type {} from 'mdast-util-to-hast';
import { type CheckState, emitComponent } from '../components/content/contract';

const CHECKBOX_RE = /^\[\s*([x/]?)\s*\]$/;

const STATE_BY_MARK: Record<string, CheckState> = { x: 'done', '/': 'partial', '': 'todo' };

export function rehypeTableCellCheckboxes() {
	return (tree: Root) => {
		const walk = (node: Nodes) => {
			if (isTableCell(node)) {
				const [only] = node.children;
				const mark =
					node.children.length === 1 && only.type === 'text'
						? CHECKBOX_RE.exec(only.value.trim())?.[1]
						: undefined;
				const state = mark === undefined ? undefined : STATE_BY_MARK[mark];
				if (state) {
					node.properties.className = ['checkCell'];
					// Read back by rehypeResponsiveTables for the mobile card view.
					node.properties.dataCheck = state;
					node.children = [{ type: 'raw', value: emitComponent('CellCheck', { state }) }];
				}
			}
			if (isParent(node)) {
				for (const child of node.children) walk(child);
			}
		};
		walk(tree);
	};
}

function isTableCell(node: Nodes): node is Element {
	return node.type === 'element' && (node.tagName === 'td' || node.tagName === 'th');
}

function isParent(node: Nodes): node is Parents {
	return 'children' in node;
}

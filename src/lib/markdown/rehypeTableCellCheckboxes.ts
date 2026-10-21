/**
 * Build-time: replace [x] / [/] / [ ] in table cells with the CellCheck
 * component (layout export). Alignment comes from the `checkCell` class in
 * prose.scss, not an inline style.
 */

import type { Root } from 'hast';
import type {} from 'mdast-util-to-hast';
import { type CheckState, emitComponent } from '../components/content/contract';
import { isElement, visitElements } from './hast';

const CHECKBOX_RE = /^\[\s*([x/]?)\s*\]$/;

const STATE_BY_MARK: Record<string, CheckState> = { x: 'done', '/': 'partial', '': 'todo' };

export function rehypeTableCellCheckboxes() {
	return (tree: Root) => {
		visitElements(tree, (cell) => {
			if (!isElement(cell, 'td', 'th')) return;
			const [only] = cell.children;
			const mark =
				cell.children.length === 1 && only.type === 'text'
					? CHECKBOX_RE.exec(only.value.trim())?.[1]
					: undefined;
			const state = mark === undefined ? undefined : STATE_BY_MARK[mark];
			if (!state) return;
			cell.properties.className = ['checkCell'];
			// Read back by rehypeResponsiveTables for the mobile card view.
			cell.properties.dataCheck = state;
			cell.children = [{ type: 'raw', value: emitComponent('CellCheck', { state }) }];
		});
	};
}

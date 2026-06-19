export function styleCheckboxes(node: HTMLElement) {
	const cells = node.querySelectorAll<HTMLTableCellElement>('td, th');
	for (const cell of cells) {
		const text = cell.textContent ?? '';
		const trimmed = text.trim();
		if (trimmed === '[x]' || trimmed === '[ ]' || trimmed === '[/]') {
			cell.style.textAlign = 'center';
			cell.style.verticalAlign = 'middle';
			const cls = trimmed === '[x]' ? 'cb full' : trimmed === '[/]' ? 'cb half' : 'cb';
			cell.innerHTML = `<span class="${cls}"></span>`;
		}
	}
}

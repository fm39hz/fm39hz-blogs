export function styleCheckboxes(node: HTMLElement) {
	const cells = node.querySelectorAll<HTMLTableCellElement>('td, th');
	for (const cell of cells) {
		const text = cell.textContent ?? '';
		const trimmed = text.trim();
		if (trimmed === '[x]' || trimmed === '[ ]' || trimmed === '[/]') {
			cell.style.textAlign = 'center';
			cell.style.verticalAlign = 'middle';
			if (trimmed === '[x]') {
				cell.innerHTML = `
					<svg class="cb full" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="10" />
						<path class="cb-path" d="M7 12.5l3.5 3.5 6.5-7" />
					</svg>
				`.trim();
			} else if (trimmed === '[/]') {
				cell.innerHTML = `
					<svg class="cb half" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="10" />
						<path class="cb-path" d="M6 18L18 6" />
					</svg>
				`.trim();
			} else {
				cell.innerHTML = `
					<svg class="cb" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="10" />
					</svg>
				`.trim();
			}
		}
	}
}

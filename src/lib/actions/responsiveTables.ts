/**
 * Client fallback: stamp data-label if rehype missed a table.
 * Does NOT clone table into cards — one semantic tree only.
 */
export function responsiveTables(container: HTMLElement) {
	for (const table of container.querySelectorAll('table')) {
		table.classList.add('prose-table');
		const headers = Array.from(table.querySelectorAll('thead th, tr:first-child th')).map(
			(th) => (th.textContent ?? '').trim(),
		);
		if (!headers.length) continue;

		const bodyRows = table.querySelectorAll('tbody tr');
		const rows = bodyRows.length > 0 ? bodyRows : table.querySelectorAll('tr');
		for (const tr of rows) {
			if (tr.querySelector('th') && !tr.querySelector('td')) continue;
			const cells = tr.querySelectorAll('td');
			cells.forEach((td, i) => {
				if (!td.getAttribute('data-label') && headers[i]) {
					td.setAttribute('data-label', headers[i]);
				}
			});
		}
	}
	return { destroy() {} };
}

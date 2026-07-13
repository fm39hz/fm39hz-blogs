export function responsiveTables(container: HTMLElement) {
	const tables = container.querySelectorAll('table');

	for (const table of tables) {
		const headers = Array.from(table.querySelectorAll('th')).map(
			(th) => th.textContent?.trim() || '',
		);
		const rows = table.querySelectorAll('tr');

		for (const row of rows) {
			// Skip the header row itself
			if (row.querySelector('th')) continue;

			const cells = row.querySelectorAll('td');
			cells.forEach((cell, index) => {
				const header = headers[index];
				if (header) {
					cell.setAttribute('data-label', header);
				}
			});
		}
	}
}

import { mount } from 'svelte';
import TableCardStack from '../components/ui/TableCardStack/TableCardStack.svelte';

export function responsiveTables(container: HTMLElement) {
	const tables = container.querySelectorAll('table');
	const mounted: ReturnType<typeof mount>[] = [];

	for (const table of tables) {
		const headers = Array.from(table.querySelectorAll('th')).map((th) => th.innerHTML.trim());
		// Check for trs in tbody, fallback to direct trs
		const bodyRows = table.querySelectorAll('tbody tr');
		const trs = bodyRows.length > 0 ? bodyRows : table.querySelectorAll('tr');

		const rows: string[][] = [];
		for (const tr of trs) {
			// Skip header row
			if (tr.querySelector('th')) continue;

			const cells = Array.from(tr.querySelectorAll('td')).map((td) => td.innerHTML.trim());
			if (cells.length > 0) {
				rows.push(cells);
			}
		}

		if (headers.length === 0 || rows.length === 0) continue;

		// Create a container wrapper for the Svelte Card Stack component
		const stackContainer = document.createElement('div');
		stackContainer.className = 'responsive-card-stack';

		// Insert the stack container right before the static table
		table.parentNode?.insertBefore(stackContainer, table);

		// Mount the Svelte card deck component
		const instance = mount(TableCardStack, {
			target: stackContainer,
			props: { headers, rows },
		});
		mounted.push(instance);
	}

	return {
		destroy() {
			for (const instance of mounted) {
				try {
					instance?.destroy?.();
				} catch (_) {}
			}
		},
	};
}

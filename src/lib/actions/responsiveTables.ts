import { mount, unmount } from 'svelte';
import TableCardStack from '$lib/components/ui/TableCardStack/TableCardStack.svelte';

/**
 * Mobile card stack: a different representation of table data.
 * - Card content rendered via CSS `attr(data-cell-text)` — no extractable text nodes.
 * - Full <table> stays clipped-off-screen for SEO/readers (one canonical source).
 */
export function responsiveTables(container: HTMLElement) {
	const mounted: { destroy: () => void }[] = [];

	for (const table of container.querySelectorAll('table')) {
		table.classList.add('prose-table');

		const headers = Array.from(
			table.querySelectorAll('thead th, thead td, tr:first-child th'),
		).map((th) => (th.textContent ?? '').trim());
		if (!headers.length) continue;

		const bodyRows = table.querySelectorAll('tbody tr');
		const trs = bodyRows.length > 0 ? bodyRows : table.querySelectorAll('tr');
		// stamp data-label for CSS fallback
		for (const tr of trs) {
			const cells = [...tr.querySelectorAll('td')];
			cells.forEach((td, i) => {
				if (!td.getAttribute('data-label') && headers[i]) {
					td.setAttribute('data-label', headers[i]);
				}
			});
		}

		const rows: string[][] = [];
		for (const tr of trs) {
			const cells = [...tr.querySelectorAll('td')];
			if (cells.length) rows.push(cells.map((td) => td.innerHTML.trim()));
		}
		if (!rows.length) continue;

		const host = document.createElement('div');
		host.className = 'responsive-card-stack';
		host.setAttribute('aria-hidden', 'true');
		table.parentNode?.insertBefore(host, table);

		const instance = mount(TableCardStack, { target: host, props: { headers, rows } });
		mounted.push({
			destroy() {
				try {
					unmount(instance);
				} catch (err) {
					console.warn('responsiveTables:', err);
				}
				host.remove();
			},
		});
	}

	return {
		destroy() {
			for (const m of mounted) m.destroy();
		},
	};
}

export function copyCode(node: HTMLElement) {
	const preBlocks = node.querySelectorAll<HTMLPreElement>('pre');
	const labels = new Map<HTMLButtonElement, string>();

	for (const pre of preBlocks) {
		const btn = document.createElement('button');
		btn.className =
			'copy-code absolute end-3 -top-3 rounded bg-muted border border-muted px-2 py-1 text-xs leading-4 text-foreground font-medium';
		btn.innerHTML = 'Copy';

		const wrapper = document.createElement('div');
		wrapper.style.position = 'relative';

		pre.setAttribute('tabindex', '0');
		pre.appendChild(btn);
		pre.parentNode?.insertBefore(wrapper, pre);
		wrapper.appendChild(pre);

		labels.set(btn, 'Copy');

		btn.addEventListener('click', async () => {
			const code = pre.querySelector('code');
			if (!code) return;
			await navigator.clipboard.writeText(code.innerText);
			btn.innerHTML = 'Copied';
			setTimeout(() => {
				btn.innerHTML = labels.get(btn) ?? 'Copy';
			}, 700);
		});
	}

	return {
		destroy() {
			// no cleanup needed for simple DOM mutations
		},
	};
}

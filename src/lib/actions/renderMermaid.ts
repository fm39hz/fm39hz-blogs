export function renderMermaid(container: HTMLElement) {
	const blocks = [...container.querySelectorAll<HTMLPreElement>('pre.mermaid')];
	if (!blocks.length) return { destroy() {} };

	for (const pre of blocks) {
		pre.setAttribute('data-code', pre.textContent || '');
	}

	(async () => {
		const { default: mermaid } = await import('mermaid');
		const s = getComputedStyle(document.documentElement);
		const accent = s.getPropertyValue('--accent').trim();
		const fg = s.getPropertyValue('--fg').trim();
		mermaid.initialize({
			startOnLoad: false,
			fontFamily: s.getPropertyValue('--font-body').trim() || 'sans-serif',
			theme: 'base',
			look: 'handDrawn',
			themeVariables: {
				primaryBorderColor: accent,
				primaryTextColor: fg,
				lineColor: fg,
				lineWidth: '2',
				borderRadius: '4px',
			},
		});
		try {
			await mermaid.run({ nodes: blocks });
			for (const pre of blocks) {
				const svg = pre.querySelector('svg');
				if (svg) svg.style.filter = 'url(#pencil-wiggle)';
			}
		} catch (e) {
			console.error('Mermaid render error:', e);
		}
	})();

	return { destroy() {} };
}

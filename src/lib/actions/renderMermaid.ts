export function renderMermaid(container: HTMLElement) {
	const blocks = [...container.querySelectorAll<HTMLPreElement>('pre.mermaid')];
	if (!blocks.length) return { destroy() {} };

	(async () => {
		const { default: mermaid } = await import('mermaid');
		const s = getComputedStyle(document.documentElement);
		const accent = s.getPropertyValue('--accent').trim();
		const fg = s.getPropertyValue('--fg').trim();
		mermaid.initialize({
			startOnLoad: false,
			fontFamily: s.getPropertyValue('--font-body').trim() || 'sans-serif',
			theme: 'base',
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
		} catch (e) {
			console.error('Mermaid render error:', e);
		}
	})();

	return { destroy() {} };
}

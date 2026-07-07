export function renderMermaid(container: HTMLElement) {
	const blocks = [...container.querySelectorAll<HTMLPreElement>('pre.mermaid')];
	if (!blocks.length) return { destroy() {} };

	(async () => {
		const { default: mermaid } = await import('mermaid');
		mermaid.initialize({ startOnLoad: false });
		try {
			await mermaid.run({ nodes: blocks });
		} catch (e) {
			console.error('Mermaid render error:', e);
		}
	})();

	return { destroy() {} };
}

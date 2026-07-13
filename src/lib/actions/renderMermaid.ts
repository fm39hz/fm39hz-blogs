import { browser } from '$app/environment';

const mermaidPromise = browser ? import('mermaid').then((m) => m.default) : null;

export function renderMermaid(container: HTMLElement) {
	const blocks = [...container.querySelectorAll<HTMLPreElement>('pre.mermaid')];
	if (!blocks.length) return { destroy() {} };

	for (const pre of blocks) {
		pre.setAttribute('data-code', pre.textContent || '');
	}

	if (browser && mermaidPromise) {
		(async () => {
			const mermaid = await mermaidPromise;
			const s = getComputedStyle(document.documentElement);
			const accent = s.getPropertyValue('--accent').trim();
			const fg = s.getPropertyValue('--fg').trim();
			mermaid.initialize({
				startOnLoad: false,
				fontFamily: s.getPropertyValue('--font-body').trim() || 'sans-serif',
				theme: 'base',
				look: 'handDrawn',
				flowchart: {
					htmlLabels: false,
				},
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
					pre.style.opacity = '1';
				}
			} catch (e) {
				console.error('Mermaid render error:', e);
				for (const pre of blocks) {
					pre.style.opacity = '1';
				}
			}
		})();
	}

	return { destroy() {} };
}

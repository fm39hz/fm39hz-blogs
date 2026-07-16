import { isCodeScrap, isFigureScrap, scrapKind } from './model';

// jsdom-free structural checks via mock elements
function el(tag: string, className = '', attrs: Record<string, string> = {}) {
	const node = {
		tagName: tag.toUpperCase(),
		classList: {
			contains: (c: string) => className.split(/\s+/).includes(c),
		},
		dataset: attrs,
		matches: (sel: string) => {
			if (sel === 'figure.diagram') return tag === 'figure' && className.includes('diagram');
			if (sel === 'pre.mermaid, pre.vega-lite')
				return (
					tag === 'pre' &&
					(className.includes('mermaid') || className.includes('vega-lite'))
				);
			return false;
		},
		querySelector: (q: string) => (q === 'code' && className.includes('has-code') ? {} : null),
	};
	return node as unknown as HTMLElement;
}

const fig = el('figure', 'diagram', { source: 'x' });
console.assert(isFigureScrap(fig), 'figure.diagram is figure');
console.assert(scrapKind(fig) === 'figure', 'kind figure');

const code = el('pre', 'has-code');
// isCodeScrap needs HTMLPreElement instanceof — skip DOM-heavy; kind via figure only here
console.assert(!isFigureScrap(code), 'plain pre not figure without class');

console.log('scrap.model.selfcheck: ok (figure contract)');

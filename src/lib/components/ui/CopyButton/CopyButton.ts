export async function copyCode(codeBlock: HTMLPreElement): Promise<boolean> {
	if (codeBlock.classList.contains('mermaid')) {
		const rawCode = codeBlock.getAttribute('data-code') || '';
		const svg = codeBlock.querySelector('svg');
		if (!svg) {
			await navigator.clipboard.writeText(rawCode);
			return true;
		}

		try {
			const pngBlob = await svgToPng(svg);

			// Copy both PNG image and raw Mermaid code text
			const item = new ClipboardItem({
				'text/plain': new Blob([rawCode], { type: 'text/plain' }),
				'image/png': pngBlob,
			});
			await navigator.clipboard.write([item]);
			return true;
		} catch (err) {
			console.error('Failed to copy diagram as image, falling back to text:', err);
			await navigator.clipboard.writeText(rawCode);
			return true;
		}
	}

	const code = codeBlock.querySelector('code');
	if (!code) return false;
	await navigator.clipboard.writeText(code.innerText);
	return true;
}

function svgToPng(svg: SVGSVGElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		// 1. Clone the SVG to manipulate it safely
		const clone = svg.cloneNode(true) as SVGSVGElement;
		if (!clone.getAttribute('xmlns')) {
			clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		}

		// 2. Replace all <foreignObject> elements with standard SVG <text> elements
		// to prevent canvas tainting security blocks in WebKit/Blink browsers
		const foreignObjects = Array.from(clone.querySelectorAll('foreignObject'));
		for (const fo of foreignObjects) {
			const textContent = fo.textContent?.trim() || '';
			const width = parseFloat(fo.getAttribute('width') || '0');
			const height = parseFloat(fo.getAttribute('height') || '0');
			const x = parseFloat(fo.getAttribute('x') || '0');
			const y = parseFloat(fo.getAttribute('y') || '0');

			const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			textNode.textContent = textContent;
			// Center the text inside the original foreignObject container
			textNode.setAttribute('x', String(x + width / 2));
			textNode.setAttribute('y', String(y + height / 2 + 4)); // Adjust vertical baseline shift
			textNode.setAttribute('dominant-baseline', 'central');
			textNode.setAttribute('text-anchor', 'middle');
			textNode.setAttribute('font-family', 'sans-serif');
			textNode.setAttribute('font-size', '13px');
			textNode.setAttribute('font-weight', '600');
			textNode.setAttribute('fill', 'var(--fg)');

			fo.parentNode?.replaceChild(textNode, fo);
		}

		// 3. Resolve CSS theme variables to absolute hex/rgb colors since SVG drawn
		// on canvas in <img> context has no access to parent document custom styles
		const s = getComputedStyle(document.documentElement);
		const accentColor = s.getPropertyValue('--accent').trim() || '#6f884c';
		const fgColor = s.getPropertyValue('--fg').trim() || '#2d3129';
		const bgColor = s.getPropertyValue('--bg').trim() || '#fdf6e3';

		let svgString = new XMLSerializer().serializeToString(clone);
		svgString = svgString
			.replace(/var\(--fg\)/g, fgColor)
			.replace(/var\(--accent\)/g, accentColor)
			.replace(/var\(--bg\)/g, bgColor);

		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(svgBlob);

		const img = new Image();
		const rect = svg.getBoundingClientRect();
		const scale = window.devicePixelRatio || 2;
		const width = (rect.width || 800) * scale;
		const height = (rect.height || 600) * scale;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Failed to get 2d context'));
				return;
			}

			// Fill canvas background matching theme
			const style = getComputedStyle(
				svg.closest('.shiki') || svg.closest('pre') || document.body,
			);
			ctx.fillStyle = style.backgroundColor || bgColor;
			ctx.fillRect(0, 0, width, height);

			ctx.drawImage(img, 0, 0, width, height);

			try {
				canvas.toBlob((blob) => {
					URL.revokeObjectURL(url);
					if (blob) {
						resolve(blob);
					} else {
						reject(new Error('Canvas toBlob returned null'));
					}
				}, 'image/png');
			} catch (err) {
				URL.revokeObjectURL(url);
				reject(err);
			}
		};

		img.onerror = (err) => {
			URL.revokeObjectURL(url);
			reject(err);
		};

		img.src = url;
	});
}

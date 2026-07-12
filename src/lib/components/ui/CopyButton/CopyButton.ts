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
		if (!svg.getAttribute('xmlns')) {
			svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		}

		const svgString = new XMLSerializer().serializeToString(svg);
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

			// Fill background with same background as the pre block
			const style = getComputedStyle(
				svg.closest('.shiki') || svg.closest('pre') || document.body,
			);
			ctx.fillStyle = style.backgroundColor || '#ffffff';
			ctx.fillRect(0, 0, width, height);

			ctx.drawImage(img, 0, 0, width, height);
			canvas.toBlob((blob) => {
				URL.revokeObjectURL(url);
				if (blob) {
					resolve(blob);
				} else {
					reject(new Error('Canvas toBlob returned null'));
				}
			}, 'image/png');
		};

		img.onerror = (err) => {
			URL.revokeObjectURL(url);
			reject(err);
		};

		img.src = url;
	});
}

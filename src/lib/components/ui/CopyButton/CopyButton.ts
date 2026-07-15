export async function copyCode(codeBlock: HTMLPreElement): Promise<boolean> {
	// Shared figure surface (mermaid, vega-lite, future diagrams)
	if (codeBlock.classList.contains('figure-surface') || codeBlock.dataset.source != null) {
		return copyFigureSurface(codeBlock);
	}

	const code = codeBlock.querySelector('code');
	if (!code) return false;
	await navigator.clipboard.writeText(code.innerText);
	return true;
}

async function copyFigureSurface(surface: HTMLElement): Promise<boolean> {
	const raw = surface.dataset.source ?? '';
	const svg = surface.querySelector('svg');
	const img = surface.querySelector('img');

	if (svg) {
		try {
			const pngBlob = await svgToPng(svg);
			const parts: Record<string, Blob> = {
				'image/png': pngBlob,
			};
			if (raw) parts['text/plain'] = new Blob([raw], { type: 'text/plain' });
			await navigator.clipboard.write([new ClipboardItem(parts)]);
			return true;
		} catch (err) {
			console.error('Figure SVG→PNG copy failed, text fallback:', err);
			if (raw) {
				await navigator.clipboard.writeText(raw);
				return true;
			}
			return false;
		}
	}

	if (img?.src) {
		try {
			const pngBlob = await imgToPng(img);
			const parts: Record<string, Blob> = { 'image/png': pngBlob };
			if (raw || img.alt) {
				parts['text/plain'] = new Blob([raw || img.alt], { type: 'text/plain' });
			}
			await navigator.clipboard.write([new ClipboardItem(parts)]);
			return true;
		} catch {
			await navigator.clipboard.writeText(raw || img.src);
			return true;
		}
	}

	if (raw) {
		await navigator.clipboard.writeText(raw);
		return true;
	}
	return false;
}

function imgToPng(img: HTMLImageElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		const w = img.naturalWidth || img.width || 800;
		const h = img.naturalHeight || img.height || 600;
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			reject(new Error('no 2d context'));
			return;
		}
		ctx.drawImage(img, 0, 0, w, h);
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else reject(new Error('toBlob null'));
		}, 'image/png');
	});
}

function svgToPng(svg: SVGSVGElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const clone = svg.cloneNode(true) as SVGSVGElement;
		if (!clone.getAttribute('xmlns')) {
			clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		}

		const foreignObjects = Array.from(clone.querySelectorAll('foreignObject'));
		for (const fo of foreignObjects) {
			const textContent = fo.textContent?.trim() || '';
			const width = parseFloat(fo.getAttribute('width') || '0');
			const height = parseFloat(fo.getAttribute('height') || '0');
			const x = parseFloat(fo.getAttribute('x') || '0');
			const y = parseFloat(fo.getAttribute('y') || '0');

			const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			textNode.textContent = textContent;
			textNode.setAttribute('x', String(x + width / 2));
			textNode.setAttribute('y', String(y + height / 2 + 4));
			textNode.setAttribute('dominant-baseline', 'central');
			textNode.setAttribute('text-anchor', 'middle');
			textNode.setAttribute('font-family', 'sans-serif');
			textNode.setAttribute('font-size', '13px');
			textNode.setAttribute('font-weight', '600');
			textNode.setAttribute('fill', 'var(--fg)');
			fo.parentNode?.replaceChild(textNode, fo);
		}

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

			const style = getComputedStyle(
				svg.closest('.figure-surface') || svg.closest('pre') || document.body,
			);
			ctx.fillStyle = style.backgroundColor || bgColor;
			ctx.fillRect(0, 0, width, height);
			ctx.drawImage(img, 0, 0, width, height);

			try {
				canvas.toBlob((blob) => {
					URL.revokeObjectURL(url);
					if (blob) resolve(blob);
					else reject(new Error('Canvas toBlob returned null'));
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

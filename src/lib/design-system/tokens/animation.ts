export type AnimationDurationToken =
	| 'fast'
	| 'normal'
	| 'enter'
	| 'slow'
	| 'page'
	| 'scene'
	| 'theme';

export type AnimationEasingToken = 'out' | 'bounce';

function readToken(name: string): string {
	if (typeof document === 'undefined') {
		throw new Error(`CSS token ${name} can only be read in the browser`);
	}

	const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	if (!value) throw new Error(`Missing design token ${name}`);
	return value;
}

export function animationDurationSeconds(token: AnimationDurationToken): number {
	const value = readToken(`--d-${token}`);
	const match = /^(-?(?:\d+(?:\.\d+)?|\.\d+))(ms|s)$/.exec(value);
	if (!match) throw new Error(`Invalid duration token --d-${token}: ${value}`);
	return Number(match[1]) * (match[2] === 'ms' ? 0.001 : 1);
}

export function animationDurationMs(token: AnimationDurationToken): number {
	return animationDurationSeconds(token) * 1000;
}

export function animationEasing(token: AnimationEasingToken): [number, number, number, number] {
	const value = readToken(`--ease-${token}`);
	const match = /^cubic-bezier\(\s*([^)]*)\)$/.exec(value);
	const values = match?.[1].split(',').map((part) => Number(part.trim()));
	if (!values || values.length !== 4 || values.some((value) => !Number.isFinite(value))) {
		throw new Error(`Invalid easing token --ease-${token}: ${value}`);
	}
	return values as [number, number, number, number];
}

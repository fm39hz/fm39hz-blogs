import {
	colors,
	durations,
	easings,
	fontSizes,
	fonts,
	iconSizes,
	lineHeights,
	scales,
	spacing,
} from '$lib/design-system/tokens';

interface ThemeVars {
	'--bg': string;
	'--fg': string;
	'--accent': string;
	'--accent-fg': string;
	'--muted': string;
	'--muted-fg': string;
	'--border': string;
	'--line': string;
	'--line-solid': string;
	'--border-w': string;
	'--border-style': string;
	'--font-body': string;
	'--fs-xs': string;
	'--fs-sm': string;
	'--fs-base': string;
	'--fs-lg': string;
	'--fs-xl': string;
	'--fs-2xl': string;
	'--fs-3xl': string;
	'--fs-4xl': string;
	'--space-3xs': string;
	'--space-2xs': string;
	'--space-xs': string;
	'--space-sm': string;
	'--space-md': string;
	'--space-lg': string;
	'--space-xl': string;
	'--space-2xl': string;
	'--icon-sm': string;
	'--icon-md': string;
	'--icon-lg': string;
	'--icon-xl': string;
	'--br': string;
	'--br-full': string;
	'--op-muted': string;
	'--op-solid': string;
	'--ease-out': string;
	'--ease-bounce': string;
	'--scale-hover': string;
	'--scale-active': string;
	'--scale-pop': string;
	'--d-fast': string;
	'--d-normal': string;
	'--d-slow': string;
	'--d-theme': string;
	'--mw': string;
}

export function cssVars(mode: 'light' | 'dark'): string {
	const modeColors = colors[mode];

	const vars: Partial<ThemeVars> = {
		...modeColors,
		'--border-w': '2px',
		'--border-style': 'dashed',
		'--font-body': "'JetBrains Mono', ui-monospace, monospace",
		'--fs-xs': '0.875rem',
		'--fs-sm': '0.75rem',
		'--fs-base': '1rem',
		'--fs-lg': '1.125rem',
		'--fs-xl': '1.25rem',
		'--fs-2xl': '1.5rem',
		'--fs-3xl': '1.75rem',
		'--fs-4xl': '2.25rem',
		'--space-3xs': '0.125rem',
		'--space-2xs': '0.375rem',
		'--space-xs': '0.25rem',
		'--space-sm': '0.5rem',
		'--space-md': '1rem',
		'--space-lg': '1.5rem',
		'--space-xl': '2rem',
		'--space-2xl': '3rem',
		'--icon-sm': '1rem',
		'--icon-md': '1.25rem',
		'--icon-lg': '1.5rem',
		'--icon-xl': '2.25rem',
		'--br': '0.25rem',
		'--br-full': '9999px',
		'--op-muted': '0.8',
		'--op-solid': '1',
		'--ease-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
		'--ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
		'--scale-hover': '1.1',
		'--scale-active': '0.95',
		'--scale-pop': '1.15',
		'--d-fast': '0.15s',
		'--d-normal': '0.2s',
		'--d-slow': '0.3s',
		'--d-theme': '0.7s',
		'--mw': '48rem',
		'--line-solid': `2px dashed var(--line)`,
	};

	return Object.entries(vars)
		.map(([key, val]) => `${key}: ${val};`)
		.join('\n  ');
}

export function rootCss(): string {
	return `:root, [data-theme="light"] {\n  ${cssVars('light')}\n}\n\n[data-theme="dark"] {\n  ${cssVars('dark')}\n}`;
}

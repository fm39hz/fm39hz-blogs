export interface ColorTokens {
	light: Record<string, string>;
	dark: Record<string, string>;
}

export const colors = {
	light: {
		'--bg': '#faedcd',
		'--fg': '#5c6a72',
		'--accent': '#93b259',
		'--accent-fg': '#efebd4',
		'--muted': '#e9f0e9',
		'--muted-fg': '#829181',
		'--border': 'color-mix(in srgb, var(--fg) 20%, var(--bg))',
		'--line': 'color-mix(in srgb, var(--fg) 15%, var(--bg))',
	},
	dark: {
		'--bg': '#232a2e',
		'--fg': '#d3c6aa',
		'--accent': '#a7c080',
		'--accent-fg': '#7a8478',
		'--muted': '#514045',
		'--muted-fg': '#9da9a0',
		'--border': 'color-mix(in srgb, var(--fg) 30%, var(--bg))',
		'--line': 'color-mix(in srgb, var(--fg) 15%, var(--bg))',
	},
} satisfies ColorTokens;

export const tailwindColors = {
	background: 'var(--background)',
	foreground: 'var(--foreground)',
	accent: 'var(--accent)',
	'accent-foreground': 'var(--accent-foreground)',
	muted: 'var(--muted)',
	'muted-foreground': 'var(--muted-foreground)',
	border: 'var(--border)',
};

export const easings = {
	'--ease-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
	'--ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const durations = {
	'--d-fast': '0.15s',
	'--d-normal': '0.2s',
	'--d-slow': '0.3s',
	'--d-theme': '0.7s',
} as const;

export const scales = {
	'--scale-hover': '1.1',
	'--scale-active': '0.95',
	'--scale-pop': '1.15',
} as const;

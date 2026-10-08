/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	ignoreFiles: ['.svelte-kit/**', '.vercel/**'],
	rules: {
		// CSS Modules use camelCase names as Svelte component exports.
		'selector-class-pattern': '^([a-z][a-zA-Z0-9]*)(-[a-z0-9]+)*$',
		// Existing modules intentionally use compact single-line rules.
		'declaration-block-single-line-max-declarations': null,
		// Svelte CSS Modules and legacy browser fallbacks use these deliberately.
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
		'property-no-vendor-prefix': [
			true,
			{ ignoreProperties: ['-webkit-mask-image', '-webkit-text-size-adjust'] },
		],
		'property-no-deprecated': [true, { ignoreProperties: ['clip'] }],
	},
	overrides: [
		{
			files: ['src/routes/**/*.module.scss'],
			rules: {
				// Route styles own route structure, not reusable component internals.
				'selector-combinator-allowed-list': ['>'],
			},
		},
	],
};

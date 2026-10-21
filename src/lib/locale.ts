/**
 * Locale SSOT: `project.inlang/settings.json` (what paraglide compiles from).
 *
 * Build-safe: vite.config imports content policy before paraglide has
 * generated `src/lib/paraglide`, so this module never imports its runtime
 * values — only the generated tuple's type, which is erased.
 */

import type { locales } from '$lib/paraglide/runtime';
import settings from '../../project.inlang/settings.json';

export type Language = (typeof locales)[number];
export type TextDirection = 'ltr' | 'rtl';

export function isLanguage(value: unknown): value is Language {
	return typeof value === 'string' && settings.locales.includes(value);
}

function assertLanguage(value: string): Language {
	if (!isLanguage(value)) {
		throw new Error(`project.inlang/settings.json: unknown locale ${value}`);
	}
	return value;
}

export const LANGUAGES: readonly Language[] = settings.locales.map(assertLanguage);
export const BASE_LANGUAGE: Language = assertLanguage(settings.baseLocale);

/** Narrow anything (URL segment, frontmatter, param) to a supported language. */
export function resolveLanguage(value: unknown): Language {
	return isLanguage(value) ? value : BASE_LANGUAGE;
}

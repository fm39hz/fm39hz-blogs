/**
 * Table-of-contents marker: authors write `## <title>` where the TOC goes.
 * One title per content language; a new language without one is a type error.
 *
 * Build-safe (vite.config imports it): relative imports only.
 */

import type { Language } from '../locale';

export const TOC_TITLES: Record<Language, string> = {
	en: 'Table of contents',
	vi: 'Mục lục',
};

function escapeRegExp(text: string): string {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Alternation of every marker title — the string form remark-toc and heading-range take. */
export const TOC_PATTERN = Object.values(TOC_TITLES).map(escapeRegExp).join('|');

/** Heading text that is a TOC marker (case-insensitive, like remark-toc). */
export const TOC_HEADING = new RegExp(`^(${TOC_PATTERN})$`, 'i');

/** A `## <marker>` line inside raw Markdown. */
export const TOC_MARKER_LINE = new RegExp(`^##\\s+(${TOC_PATTERN})\\s*$`, 'mi');

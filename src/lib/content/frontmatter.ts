/**
 * Frontmatter boundary: author-written YAML becomes a typed `PostMeta` here,
 * checked at runtime instead of cast. YAML parses bare dates as `Date`
 * (mdsvex's exported `metadata` later serializes them to ISO strings), so
 * dates are normalized to ISO strings — the shape `PostMeta` declares.
 *
 * Build-safe (scripts and vite.config use it): relative imports only.
 */

import { isLanguage } from '../locale';
import type { PostMeta } from '../types';
import type { ContentHeading } from './types';

function field(source: object, key: string): unknown {
	return Reflect.get(source, key);
}

function fail(file: string, key: string, expected: string): never {
	throw new Error(`${file}: frontmatter \`${key}\` must be ${expected}`);
}

function requiredString(source: object, key: string, file: string): string {
	const value = field(source, key);
	return typeof value === 'string' && value.trim()
		? value
		: fail(file, key, 'a non-empty string');
}

function optionalString(source: object, key: string, file: string): string | undefined {
	const value = field(source, key);
	if (value === undefined || value === null) return undefined;
	return typeof value === 'string' ? value : fail(file, key, 'a string');
}

function optionalBoolean(source: object, key: string, file: string): boolean | undefined {
	const value = field(source, key);
	if (value === undefined) return undefined;
	return typeof value === 'boolean' ? value : fail(file, key, 'true or false');
}

function isoDate(value: unknown): string | undefined {
	if (value instanceof Date)
		return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
	if (typeof value !== 'string') return undefined;
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function isHeading(value: unknown): value is ContentHeading {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof field(value, 'id') === 'string' &&
		typeof field(value, 'text') === 'string' &&
		typeof field(value, 'depth') === 'number'
	);
}

/** Validate parsed frontmatter (`result.data.fm`) of `file` into `PostMeta`. */
export function toPostMeta(value: unknown, file: string): PostMeta {
	if (typeof value !== 'object' || value === null) {
		throw new Error(`${file}: missing frontmatter`);
	}

	const pubDatetime = isoDate(field(value, 'pubDatetime')) ?? fail(file, 'pubDatetime', 'a date');
	const rawModified = field(value, 'modDatetime');
	const modDatetime =
		rawModified === undefined || rawModified === null
			? undefined
			: (isoDate(rawModified) ?? fail(file, 'modDatetime', 'a date'));

	const tags = field(value, 'tags');
	if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === 'string')) {
		fail(file, 'tags', 'a list of strings');
	}

	const lang = field(value, 'lang');
	if (lang !== undefined && !isLanguage(lang)) fail(file, 'lang', 'a configured locale');

	const headings = field(value, 'headings');
	if (headings !== undefined && !(Array.isArray(headings) && headings.every(isHeading))) {
		fail(file, 'headings', 'generated heading metadata');
	}

	return {
		title: requiredString(value, 'title', file),
		description: requiredString(value, 'description', file),
		pubDatetime,
		modDatetime,
		tags,
		lang,
		headings,
		author: optionalString(value, 'author', file),
		featured: optionalBoolean(value, 'featured', file),
		draft: optionalBoolean(value, 'draft', file),
		ogImage: optionalString(value, 'ogImage', file),
		canonicalURL: optionalString(value, 'canonicalURL', file),
		hideEditPost: optionalBoolean(value, 'hideEditPost', file),
		location: optionalString(value, 'location', file),
		timezone: optionalString(value, 'timezone', file),
	};
}

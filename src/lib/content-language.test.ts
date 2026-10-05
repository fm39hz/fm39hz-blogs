import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { mdsvex } from 'mdsvex';
import {
	assertEquivalentHeadings,
	contentLocale,
	contentSlug,
	selectLocalizedPosts,
	translatedFragment,
} from './content-language';
import { remarkHeadingSlugs } from './markdown/headingSlug';
import type { PostMeta } from './types';

async function headings(body: string, filename = 'example.en.md') {
	const result = await mdsvex({
		extensions: ['.md'],
		highlight: false,
		remarkPlugins: [remarkHeadingSlugs],
	}).markup({ content: `---\ntitle: Example\n---\n${body}`, filename });
	return (result?.data?.fm as PostMeta).headings!;
}

describe('content language and bilingual headings', () => {
	test('homepage filters locale, catalogs include every article once with the best translation', () => {
		const posts = [
			{ slug: 'english', lang: 'en' },
			{ slug: 'vietnamese', lang: 'vi' },
			{ slug: 'both', lang: 'en' },
			{ slug: 'both', lang: 'vi' },
		];
		assert.deepEqual(
			selectLocalizedPosts(posts, 'vi', true).map((post) => post.slug),
			['vietnamese', 'both'],
		);
		assert.deepEqual(
			selectLocalizedPosts(posts, 'en', true).map((post) => post.slug),
			['english', 'both'],
		);
		assert.deepEqual(
			selectLocalizedPosts(posts, 'vi').map((post) => post.lang),
			['en', 'vi', 'vi'],
		);
		assert.deepEqual(
			selectLocalizedPosts(posts, 'en').map((post) => post.lang),
			['en', 'vi', 'en'],
		);
	});
	test('supports legacy Markdown, frontmatter locale and shared basename', () => {
		assert.equal(contentLocale('example.md'), 'en');
		assert.equal(contentLocale('example.md', 'vi'), 'vi');
		assert.equal(contentLocale('example.vi.md'), 'vi');
		assert.equal(contentSlug('example.vi.md'), contentSlug('example.en.md'));
	});

	test('rejects conflicting or unsupported language declarations', () => {
		assert.throws(() => contentLocale('example.vi.md', 'en'), /conflicts/);
		assert.throws(() => contentLocale('example.md', 'fr'), /unsupported/);
	});

	test('AST includes setext and deep headings, ignores fenced code and TOC marker', async () => {
		const outline = await headings(
			'## Table of contents\n\nIntro\n-----\n\n```md\n## Fake\n```\n\n##### Deep',
		);
		assert.deepEqual(
			outline.map(({ text, depth }) => [text, depth]),
			[
				['Intro', 2],
				['Deep', 5],
			],
		);
	});

	test('translated text and a localized TOC marker preserve equivalent structure', async () => {
		const en = await headings('## Table of contents\n\n## Responsibility\n\n### Consequences');
		const vi = await headings('## Mục lục\n\n## Trách nhiệm\n\n### Hệ quả', 'example.vi.md');
		assert.doesNotThrow(() => assertEquivalentHeadings(en, vi, 'example'));
		assert.equal(translatedFragment('#responsibility', en, vi), '#trach-nhiem');
		assert.equal(translatedFragment('#he-qua', vi, en), '#consequences');
	});

	test('rejects missing headings and different hierarchy, including deep headings', async () => {
		const left = await headings('## A\n\n### B\n\n#### C');
		const wrongDepth = await headings('## X\n\n### Y\n\n##### Z');
		assert.throws(() => assertEquivalentHeadings(left, wrongDepth, 'example'), /heading 3/);
		assert.throws(() => assertEquivalentHeadings(left, left.slice(0, 2), 'example'), /missing/);
	});

	test('duplicate heading slugs map by position and preserve collision suffixes', async () => {
		const en = await headings('## State\n\n## State');
		const vi = await headings('## Trạng thái\n\n## Trạng thái', 'example.vi.md');
		assert.equal(translatedFragment('#state-1', en, vi), '#trang-thai-1');
	});

	test('unknown or malformed fragments are dropped', async () => {
		const outline = await headings('## State');
		assert.equal(translatedFragment('#missing', outline, outline), '');
		assert.equal(translatedFragment('#%FF', outline, outline), '');
		assert.equal(translatedFragment('', outline, outline), '');
	});
});

import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { resolveLanguage } from '$lib/locale';
import type { Language, PostMeta } from '$lib/types';
import { toPostMeta } from './frontmatter';
import { buildSeriesInfo, type SeriesValidationEntry, validateSeriesEntries } from './series';

const language: Language = 'en';

function metadata(series?: PostMeta['series']): PostMeta {
	return {
		title: 'Article',
		description: 'Desc',
		pubDatetime: '2026-01-01',
		tags: [],
		series,
	};
}

function entry(slug: string, order: number, title = 'Game Dev 101'): SeriesValidationEntry {
	return {
		name: `${slug}.md`,
		slug,
		lang: language,
		metadata: metadata({ id: 'gamedev-101', title, order }),
	};
}

describe('series frontmatter and navigation', () => {
	test('parses valid series with explicit id', () => {
		const meta = toPostMeta(
			{
				title: 'Part Two',
				description: 'Desc',
				pubDatetime: '2026-01-01',
				tags: ['game'],
				series: {
					id: 'game-arch',
					title: 'Game Architecture',
					order: 2,
				},
			},
			'test.md',
		);
		assert.deepEqual(meta.series, {
			id: 'game-arch',
			title: 'Game Architecture',
			order: 2,
		});
	});

	test('generates slug id when id is omitted in series', () => {
		const meta = toPostMeta(
			{
				title: 'Part One',
				description: 'Desc',
				pubDatetime: '2026-01-01',
				tags: [],
				series: {
					title: 'Game Architecture',
					order: 1,
				},
			},
			'test.md',
		);
		assert.equal(meta.series?.id, 'game-architecture');
		assert.equal(meta.series?.order, 1);
	});

	test('rejects non-positive or non-integer order', () => {
		assert.throws(
			() =>
				toPostMeta(
					{
						title: 'Invalid',
						description: 'Desc',
						pubDatetime: '2026-01-01',
						tags: [],
						series: {
							title: 'Series',
							order: 0,
						},
					},
					'test.md',
				),
			/series\.order.*must be a positive integer/,
		);
	});

	test('builds ordered navigation around the current article', () => {
		const info = buildSeriesInfo('part-2', { id: 'series', title: 'Series', order: 2 }, [
			{
				slug: 'part-3',
				lang: language,
				metadata: metadata({ id: 'series', title: 'Series', order: 3 }),
			},
			{
				slug: 'part-1',
				lang: language,
				metadata: metadata({ id: 'series', title: 'Series', order: 1 }),
			},
			{
				slug: 'part-2',
				lang: language,
				metadata: metadata({ id: 'series', title: 'Series', order: 2 }),
			},
		]);

		assert.deepEqual(
			info.parts.map((part) => part.slug),
			['part-1', 'part-2', 'part-3'],
		);
		assert.equal(info.prev?.slug, 'part-1');
		assert.equal(info.next?.slug, 'part-3');
		assert.equal(info.parts[1].isCurrent, true);
	});

	test('rejects duplicate order within one locale', () => {
		assert.throws(
			() => validateSeriesEntries([entry('part-1', 1), entry('other-part-1', 1)]),
			/duplicate order 1/,
		);
	});

	test('rejects partial series membership across translations', () => {
		const translated = {
			...entry('part-1', 1),
			lang: resolveLanguage('vi'),
			metadata: metadata(),
		};
		assert.throws(
			() => validateSeriesEntries([entry('part-1', 1), translated]),
			/translations must declare the same series membership/,
		);
	});
});

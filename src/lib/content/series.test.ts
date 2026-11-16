import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { toPostMeta } from './frontmatter';

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
});

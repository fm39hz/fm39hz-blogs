import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import {
	filterArticles,
	getTopicFacets,
	parseDiscoveryState,
	serializeDiscoveryState,
} from './article-discovery';
import { articleDiscoveryPath } from './discovery-url';

const articles = [
	{
		slug: 'systems',
		metadata: {
			title: 'Design systems',
			description: 'A guide to reusable interfaces for games',
			tags: ['Design', 'Architecture'],
		},
	},
	{
		slug: 'games',
		metadata: {
			title: 'Games and rules',
			description: 'Notes on game design',
			tags: ['Games', 'Architecture'],
		},
	},
	{
		slug: 'design-notes',
		metadata: {
			title: 'Design notes',
			description: 'Short observations',
			tags: ['Design'],
		},
	},
];

describe('article discovery state', () => {
	test('reads a trimmed query and unique repeated topic filters', () => {
		const state = parseDiscoveryState(
			new URLSearchParams('q=%20game%20design%20&tag=games&tag=design&tag=games'),
		);

		assert.deepEqual(state, { query: 'game design', tags: ['games', 'design'] });
	});

	test('serializes state while preserving unrelated query parameters', () => {
		const params = serializeDiscoveryState(
			{ query: '  game design ', tags: ['games', 'design', 'games'] },
			new URLSearchParams('utm_source=home&q=old&tag=old'),
		);

		assert.equal(params.get('utm_source'), 'home');
		assert.equal(params.get('q'), 'game design');
		assert.deepEqual(params.getAll('tag'), ['games', 'design']);
	});

	test('matches every query term and any selected topic', () => {
		const result = filterArticles(articles, {
			query: 'design game',
			tags: ['games', 'design'],
		});

		assert.deepEqual(
			result.map((article) => article.slug),
			['systems', 'games'],
		);
	});

	test('counts each topic once per article', () => {
		assert.deepEqual(getTopicFacets(articles), [
			{ tag: 'architecture', name: 'Architecture', count: 2 },
			{ tag: 'design', name: 'Design', count: 2 },
			{ tag: 'games', name: 'Games', count: 1 },
		]);
	});

	test('builds a localized shareable URL for the selected query and topics', () => {
		assert.equal(
			articleDiscoveryPath({ query: 'game design', tags: ['games', 'architecture'] }, 'vi'),
			'/vi/search?q=game+design&tag=games&tag=architecture',
		);
	});
});

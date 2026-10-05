import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { searchArticles } from '../content/search';
import { articlePath, getLocalizedPath, languageSwitchPath } from './localized-url';

describe('localized navigation', () => {
	test('localizes in both directions without losing query or fragment', () => {
		assert.equal(getLocalizedPath('/articles?q=game#top', 'vi'), '/vi/articles?q=game#top');
		assert.equal(getLocalizedPath('/vi/articles?q=game#top', 'en'), '/articles?q=game#top');
		assert.equal(articlePath('freedom', 'vi'), '/vi/articles/freedom');
	});

	test('maps bilingual hash and preserves query', () => {
		const entries = [
			{
				lang: 'en' as const,
				metadata: {
					headings: [{ id: 'responsibility', text: 'Responsibility', depth: 2 }],
				},
			},
			{
				lang: 'vi' as const,
				metadata: { headings: [{ id: 'trach-nhiem', text: 'Trách nhiệm', depth: 2 }] },
			},
		];
		assert.equal(
			languageSwitchPath(
				new URL('https://example.test/articles/x?q=1#responsibility'),
				'vi',
				entries,
			),
			'/vi/articles/x?q=1#trach-nhiem',
		);
		assert.equal(
			languageSwitchPath(
				new URL('https://example.test/vi/articles/x?q=1#trach-nhiem'),
				'en',
				entries,
			),
			'/articles/x?q=1#responsibility',
		);
	});

	test('monolingual article switches to target catalog, without inventing a translation', () => {
		assert.equal(
			languageSwitchPath(new URL('https://example.test/vi/articles/x?q=1#section'), 'en', [
				{ lang: 'vi', metadata: {} },
			]),
			'/articles?q=1',
		);
	});

	test('normal UI page switch preserves query and hash', () => {
		assert.equal(
			languageSwitchPath(new URL('https://example.test/archives?q=1#year'), 'vi'),
			'/vi/archives?q=1#year',
		);
	});

	test('search matches Vietnamese without accents and searches all catalog metadata', () => {
		const posts = [
			{
				metadata: {
					title: 'Tự do và trách nhiệm',
					description: 'Về AoT',
					tags: ['literature'],
					pubDatetime: '2026-01-01',
				},
			},
			{
				metadata: {
					title: 'Game architecture',
					description: 'Rules and state',
					tags: ['game-dev'],
					pubDatetime: '2026-01-01',
				},
			},
		];
		assert.equal(searchArticles(posts, '').length, 2);
		assert.equal(searchArticles(posts, 'tu do').length, 1);
		assert.equal(searchArticles(posts, 'game state').length, 1);
		assert.equal(searchArticles(posts, 'literature')[0], posts[0]);
	});
});

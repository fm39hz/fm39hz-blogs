import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { arrivalPath, type NavigationOrigin } from './back-link';

function origin(
	path: string,
	route: string | null,
	params: Record<string, string> = {},
): NavigationOrigin {
	return { url: new URL(path, 'https://site.test'), route: { id: route }, params };
}

describe('article back link', () => {
	test('returns to the in-app page the reader came from, keeping its query', () => {
		assert.equal(arrivalPath(origin('/', '/'), 'a'), '/');
		assert.equal(
			arrivalPath(origin('/vi/topics/game-dev', '/topics/[tag]'), 'a'),
			'/vi/topics/game-dev',
		);
		assert.equal(arrivalPath(origin('/search?q=ecs', '/search'), 'a'), '/search?q=ecs');
		assert.equal(
			arrivalPath(origin('/articles/b#intro', '/articles/[slug]', { slug: 'b' }), 'a'),
			'/articles/b',
		);
	});

	test('ignores entry from outside the app and moves within the same article', () => {
		assert.equal(arrivalPath(null, 'a'), null);
		assert.equal(arrivalPath(origin('/somewhere', null), 'a'), null);
		assert.equal(
			arrivalPath(origin('/articles/a#toc', '/articles/[slug]', { slug: 'a' }), 'a'),
			null,
		);
		assert.equal(
			arrivalPath(origin('/vi/articles/a', '/articles/[slug]', { slug: 'a' }), 'a'),
			null,
		);
	});
});

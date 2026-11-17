import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { arrivalPath, type NavigationOrigin } from './back-link';

function origin(path: string, route: string | null): NavigationOrigin {
	return { url: new URL(path, 'https://site.test'), route: { id: route } };
}

describe('article back link', () => {
	test('returns to the in-app entry surface and keeps its query', () => {
		assert.equal(arrivalPath(origin('/', '/')), '/');
		assert.equal(
			arrivalPath(origin('/vi/topics/game-dev', '/topics/[tag]')),
			'/vi/topics/game-dev',
		);
		assert.equal(arrivalPath(origin('/search?q=ecs', '/search')), '/search?q=ecs');
	});

	test('ignores article traversal and entries outside the app', () => {
		assert.equal(arrivalPath(origin('/articles/part-1', '/articles/[slug]')), null);
		assert.equal(arrivalPath(null), null);
		assert.equal(arrivalPath(origin('/somewhere', null)), null);
	});
});

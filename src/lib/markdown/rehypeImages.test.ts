import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { rehypeImages } from './rehypeImages';

describe('prose image compilation', () => {
	test('emits Components.ArticleImage with the authored src, alt and title', () => {
		const tree = fromHtml('<p><img src="/favicon.png" alt="Site icon" title="Icon" /></p>', {
			fragment: true,
		});
		rehypeImages()(tree);
		const output = toHtml(tree, { allowDangerousHtml: true });
		assert.ok(output.includes('<Components.ArticleImage'));
		assert.ok(output.includes('src={"/favicon.png"}'));
		assert.ok(output.includes('alt={"Site icon"}'));
		assert.ok(output.includes('title={"Icon"}'));
		assert.doesNotMatch(output, /<img/);
	});

	test('keeps images the wrapper cannot own', () => {
		const tree = fromHtml(
			[
				'<p><a href="https://example.com"><img src="/badge.svg" alt="badge" /></a></p>',
				'<p><img src="/wide.png" alt="wide" width="640" /></p>',
				'<table><tbody><tr><td><img src="/cell.png" alt="cell" /></td></tr></tbody></table>',
			].join(''),
			{ fragment: true },
		);
		rehypeImages()(tree);
		const output = toHtml(tree);
		assert.doesNotMatch(output, /Components\.ArticleImage/);
		assert.equal(output.match(/<img/g)?.length, 3);
	});

	test('skips an image without a usable source', () => {
		const tree = fromHtml('<p><img alt="nameless" /></p>', { fragment: true });
		rehypeImages()(tree);
		assert.doesNotMatch(toHtml(tree), /Components\.ArticleImage/);
	});
});

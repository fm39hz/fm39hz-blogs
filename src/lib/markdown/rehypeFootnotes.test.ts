import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { rehypeFootnotes } from './rehypeFootnotes';

describe('footnote popup compilation', () => {
	test('renders Markdown citation text in numbered popups and keeps the footnote list', () => {
		const tree = fromHtml(
			`
			<sup id="fnref-first"><a class="footnote-ref" href="#fn-first">first</a></sup>
			<sup id="fnref-second"><a class="footnote-ref" href="#fn-second">second</a></sup>
			<div class="footnotes"><ol>
			<li id="fn-first"><p>Ludwig Wittgenstein, <em>Philosophical Investigations</em> (Basil Blackwell, 1953), secs. 65-71.<a class="footnote-backref" href="#fnref-first">↩</a></p></li>
			<li id="fn-second"><p>Wittgenstein, <em>Philosophical Investigations</em>, sec. 109.<a class="footnote-backref" href="#fnref-second">↩</a></p></li>
			</ol></div>`,
			{ fragment: true },
		);
		rehypeFootnotes()(tree);
		const output = toHtml(tree, { allowDangerousHtml: true });
		assert.equal(output.match(/<Components.FootnoteRef/g)?.length, 2);
		assert.ok(output.includes('number={1}'));
		assert.ok(output.includes('number={2}'));
		assert.ok(output.includes('Ludwig Wittgenstein'));
		assert.ok(output.includes('Wittgenstein,'));
		assert.ok(output.includes('secs. 65'));
		assert.ok(output.includes('sec. 109'));
		assert.equal(output.match(/footnote-backref/g)?.length, 2);
		assert.ok(output.includes('<li id="fn-first">'));
	});

	test('an unresolved target keeps its original anchor', () => {
		const tree = fromHtml(
			'<sup id="fnref-missing"><a class="footnote-ref" href="#fn-missing">missing</a></sup>',
			{ fragment: true },
		);
		rehypeFootnotes()(tree);
		assert.ok(toHtml(tree).includes('href="#fn-missing"'));
	});
});

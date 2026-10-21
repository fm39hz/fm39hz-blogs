import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { buildCopyMarkdown } from './markdown';

describe('copy Markdown citations', () => {
	test('numbers citations by first reference and keeps Chicago text in Markdown', () => {
		const output = buildCopyMarkdown(
			{
				title: 'Example',
				description: 'Description',
				pubDatetime: '2026-01-01',
				lang: 'en',
				headings: [],
			},
			'First claim[^first], then second[^second].\n\n' +
				'[^second]: Wittgenstein, *Philosophical Investigations*, sec. 109.\n' +
				'[^first]: Ludwig Wittgenstein, *Philosophical Investigations* (Basil Blackwell, 1953), sec. 65.',
		);
		assert.ok(output.includes('First claim([^1]), then second([^2]).'));
		assert.ok(output.includes('[^1]: Ludwig Wittgenstein, *Philosophical Investigations*'));
		assert.ok(output.includes('[^2]: Wittgenstein, *Philosophical Investigations*'));
	});
});

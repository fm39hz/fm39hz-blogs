import assert from 'node:assert/strict';
import { describe, it as test } from 'node:test';
import { buildCopyMarkdown, type CopyMarkdownLabels } from './markdown';

const labels: CopyMarkdownLabels = {
	series: (title, current, total) =>
		`This article is part of the "${title}" series, part ${current} of ${total}.`,
	hostedAt: (url) => `This article is hosted at: <${url}>`,
};

const viLabels: CopyMarkdownLabels = {
	series: (title, current, total) =>
		`Bài viết này thuộc chuỗi "${title}", phần ${current} / ${total}.`,
	hostedAt: (url) => `Bài viết được đăng tại: <${url}>`,
};
describe('copy Markdown citations', () => {
	test('numbers citations by first reference and keeps Chicago text in Markdown', () => {
		const output = buildCopyMarkdown(
			{
				title: 'Example',
				description: 'Description',
				pubDatetime: '2026-01-01',
				lang: 'en',
				headings: [],
				labels,
			},
			'First claim[^first], then second[^second].\n\n' +
				'[^second]: Wittgenstein, *Philosophical Investigations*, sec. 109.\n' +
				'[^first]: Ludwig Wittgenstein, *Philosophical Investigations* (Basil Blackwell, 1953), sec. 65.',
		);
		assert.ok(output.includes('First claim([^1]), then second([^2]).'));
		assert.ok(output.includes('[^1]: Ludwig Wittgenstein, *Philosophical Investigations*'));
		assert.ok(output.includes('[^2]: Wittgenstein, *Philosophical Investigations*'));
	});

	test('places series metadata immediately before the hosted-at line', () => {
		const output = buildCopyMarkdown(
			{
				title: 'Part Two',
				description: 'Description',
				pubDatetime: '2026-01-01',
				lang: 'en',
				headings: [],
				series: { title: 'Game Dev 101', currentOrder: 2, totalParts: 4 },
				sourceUrl: 'https://example.com/article',
				labels,
			},
			'Body.',
		);

		assert.match(
			output,
			/This article is part of the "Game Dev 101" series, part 2 of 4\.\n\nThis article is hosted at: <https:\/\/example\.com\/article>/,
		);
	});

	test('does not add series metadata to ordinary articles', () => {
		const output = buildCopyMarkdown(
			{
				title: 'Standalone',
				pubDatetime: '2026-01-01',
				lang: 'en',
				headings: [],
				labels,
			},
			'Body.',
		);

		assert.doesNotMatch(output, /This article is part of the/);
	});

	test('renders localized copy labels supplied by the caller', () => {
		const output = buildCopyMarkdown(
			{
				title: 'Phần Hai',
				pubDatetime: '2026-01-01',
				lang: 'vi',
				headings: [],
				labels: viLabels,
				series: { title: 'Game Dev 101', currentOrder: 2, totalParts: 4 },
				sourceUrl: 'https://example.com/article',
			},
			'Noi dung.',
		);

		assert.match(
			output,
			/Bài viết này thuộc chuỗi "Game Dev 101", phần 2 \/ 4\.\n\nBài viết được đăng tại: <https:\/\/example\.com\/article>/,
		);
	});
});

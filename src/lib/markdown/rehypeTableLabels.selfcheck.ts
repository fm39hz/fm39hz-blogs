import { rehypeTableLabels } from './rehypeTableLabels';

// biome-ignore lint/suspicious/noExplicitAny: selfcheck fixture
const tree: any = {
	type: 'root',
	children: [
		{
			type: 'element',
			tagName: 'table',
			properties: {},
			children: [
				{
					type: 'element',
					tagName: 'thead',
					children: [
						{
							type: 'element',
							tagName: 'tr',
							children: [
								{
									type: 'element',
									tagName: 'th',
									children: [{ type: 'text', value: 'A' }],
								},
								{
									type: 'element',
									tagName: 'th',
									children: [{ type: 'text', value: 'B' }],
								},
							],
						},
					],
				},
				{
					type: 'element',
					tagName: 'tbody',
					children: [
						{
							type: 'element',
							tagName: 'tr',
							children: [
								{
									type: 'element',
									tagName: 'td',
									properties: {},
									children: [{ type: 'text', value: '1' }],
								},
								{
									type: 'element',
									tagName: 'td',
									properties: {},
									children: [{ type: 'text', value: '2' }],
								},
							],
						},
					],
				},
			],
		},
	],
};

rehypeTableLabels()(tree);
const tds = tree.children[0].children[1].children[0].children;
console.assert(tds[0].properties.dataLabel === 'A', 'first cell label A');
console.assert(tds[1].properties.dataLabel === 'B', 'second cell label B');
console.assert(
	Array.isArray(tree.children[0].properties.className) &&
		tree.children[0].properties.className.includes('prose-table'),
	'prose-table class',
);
console.log('rehypeTableLabels.selfcheck: ok');

import type { Properties, Root } from 'hast';
import { rehypeTableLabels } from './rehypeTableLabels';

const tree = {
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
					properties: {},
					children: [
						{
							type: 'element',
							tagName: 'tr',
							properties: {},
							children: [
								{
									type: 'element',
									tagName: 'th',
									properties: {},
									children: [{ type: 'text', value: 'A' }],
								},
								{
									type: 'element',
									tagName: 'th',
									properties: {},
									children: [{ type: 'text', value: 'B' }],
								},
							],
						},
					],
				},
				{
					type: 'element',
					tagName: 'tbody',
					properties: {},
					children: [
						{
							type: 'element',
							tagName: 'tr',
							properties: {},
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
} satisfies Root;

rehypeTableLabels()(tree);
const tds = tree.children[0].children[1].children[0].children;
const firstCellProperties: Properties = tds[0].properties;
const secondCellProperties: Properties = tds[1].properties;
const tableProperties: Properties = tree.children[0].properties;
console.assert(firstCellProperties.dataLabel === 'A', 'first cell label A');
console.assert(secondCellProperties.dataLabel === 'B', 'second cell label B');
console.assert(
	Array.isArray(tableProperties.className) && tableProperties.className.includes('prose-table'),
	'prose-table class',
);
console.log('rehypeTableLabels.selfcheck: ok');

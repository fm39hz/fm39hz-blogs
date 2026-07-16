import { absoluteUrl, stripFrontmatter } from './markdown';

const body = stripFrontmatter('---\ntitle: x\n---\nhello\nworld');
console.assert(body === 'hello\nworld', 'strip body');
console.assert(stripFrontmatter('no fm') === 'no fm', 'no fm');
console.assert(
	absoluteUrl('https://ex.com/', 'image.PNG') === 'https://ex.com/image.PNG',
	'abs path',
);
console.assert(
	absoluteUrl('https://ex.com', 'https://cdn/x.png') === 'https://cdn/x.png',
	'abs keep',
);
console.log('markdown.selfcheck: ok');

import { stripFrontmatter } from './markdown';

const body = stripFrontmatter('---\ntitle: x\n---\nhello\nworld');
console.assert(body === 'hello\nworld', 'strip body');
console.assert(stripFrontmatter('no fm') === 'no fm', 'no fm');
console.log('markdown.selfcheck: ok');

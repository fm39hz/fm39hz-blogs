import { articleUrl, siteUrl } from './site';

// cfg.site.url = https://fm39hz.is-a.dev
console.assert(siteUrl() === 'https://fm39hz.is-a.dev', 'root');
console.assert(siteUrl('/articles/x') === 'https://fm39hz.is-a.dev/articles/x', 'path');
console.assert(siteUrl('favicon.png') === 'https://fm39hz.is-a.dev/favicon.png', 'bare');
console.assert(siteUrl('https://cdn.example/a.png') === 'https://cdn.example/a.png', 'keep abs');
console.assert(articleUrl('hello') === 'https://fm39hz.is-a.dev/articles/hello', 'article');
console.log('site.selfcheck: ok');

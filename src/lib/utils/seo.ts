import cfg from '$lib/config';
import type { PostMeta } from '$lib/types';
import { resolveAuthor } from '$lib/utils/author';
import { articleUrl, siteUrl } from '$lib/utils/site';

export type PostSeo = {
	title: string;
	description: string;
	author: string;
	canonical: string;
	ogImage: string;
	pubDatetime: string;
	modDatetime?: string | null;
	tags: string[];
	jsonLd: string;
};

export function buildPostSeo(meta: PostMeta, slug: string): PostSeo {
	const author = resolveAuthor(meta);
	const canonical = meta.canonicalURL ? siteUrl(meta.canonicalURL) : articleUrl(slug);
	const ogImage = siteUrl(meta.ogImage || cfg.site.ogImage || '/favicon.png');
	const title = meta.title;
	const description = meta.description;

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description,
		datePublished: meta.pubDatetime,
		...(meta.modDatetime ? { dateModified: meta.modDatetime } : {}),
		author: {
			'@type': 'Person',
			name: author,
			...(cfg.site.profile ? { url: cfg.site.profile } : {}),
		},
		image: [ogImage],
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
		url: canonical,
	});

	return {
		title,
		description,
		author,
		canonical,
		ogImage,
		pubDatetime: meta.pubDatetime,
		modDatetime: meta.modDatetime,
		tags: meta.tags ?? [],
		jsonLd,
	};
}

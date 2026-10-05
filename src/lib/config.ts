import { Dir, Lang } from '$lib/constants';
import type { BlogConfig } from '$lib/types';
import { SCHEDULED_POST_MARGIN_MS } from './data/publication';

const cfg: BlogConfig = {
	site: {
		url: 'https://fm39hz.is-a.dev',
		title: 'FM39hz',
		description: 'A personal site to serve my ego',
		author: 'FM39hz',
		profile: 'https://fm39hz.is-a.dev/author',
		ogImage: '/favicon.png',
		lang: Lang.EN,
		timezone: 'Asia/Bangkok',
		dir: Dir.LTR,
		hero: {
			title: "FM39hz's blog",
			tagline: 'This is my personal blogs, to mumbling about Work & Life',
		},
	},
	posts: {
		perPage: 4,
		perIndex: 4,
		scheduledPostMargin: SCHEDULED_POST_MARGIN_MS,
	},
	features: {
		lightAndDarkMode: true,
		dynamicOgImage: false,
		showArchives: true,
		showBackButton: true,
		editPost: { enabled: false },
		search: 'pagefind',
	},
	socials: [
		{ name: 'github', url: 'https://github.com/fm39hz' },
		{ name: 'x', url: 'https://x.com/fm39hz' },
		{ name: 'linkedin', url: 'https://www.linkedin.com/in/fm39hz' },
		{ name: 'mail', url: 'mailto:fm39hz@gmail.com' },
	],
};

export default cfg;

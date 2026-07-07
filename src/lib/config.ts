import { Dir, Lang } from '$lib/constants';
import type { BlogConfig } from '$lib/types';

const cfg: BlogConfig = {
	site: {
		url: 'https://fm39hz.online',
		title: 'FM39hz',
		description: 'A personal site to serve my ego',
		author: 'FM39hz',
		profile: 'https://fm39hz.online/author',
		ogImage: 'image.PNG',
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
		scheduledPostMargin: 15 * 60 * 1000,
	},
	features: {
		lightAndDarkMode: true,
		dynamicOgImage: true,
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
	shareLinks: [
		{ name: 'facebook', url: 'https://www.facebook.com/sharer.php?u=' },
		{ name: 'x', url: 'https://x.com/intent/post?url=' },
		{ name: 'telegram', url: 'https://t.me/share/url?url=' },
		{ name: 'mail', url: 'mailto:?subject=See%20this%20post&body=' },
	],
};

export default cfg;

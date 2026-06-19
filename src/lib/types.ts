export interface SiteConfig {
	url: string;
	title: string;
	description: string;
	author: string;
	profile?: string;
	ogImage?: string;
	lang: string;
	timezone: string;
	dir: 'ltr' | 'rtl' | 'auto';
	googleVerification?: string;
}

export interface PostsConfig {
	perPage: number;
	perIndex: number;
	scheduledPostMargin: number;
}

export interface FeaturesConfig {
	lightAndDarkMode: boolean;
	dynamicOgImage: boolean;
	showArchives: boolean;
	showBackButton: boolean;
	editPost: { enabled: true; url: string } | { enabled: false };
	search: 'pagefind' | false;
}

export interface SocialLink {
	name: string;
	url: string;
	linkTitle?: string;
}

export interface ShareLink {
	name: string;
	url: string;
	linkTitle?: string;
}

export interface BlogConfig {
	site: SiteConfig;
	posts: PostsConfig;
	features: FeaturesConfig;
	socials: SocialLink[];
	shareLinks: ShareLink[];
}

export interface PostMeta {
	pubDatetime: string;
	modDatetime?: string | null;
	title: string;
	featured?: boolean;
	draft?: boolean;
	tags: string[];
	ogImage?: string;
	description: string;
	canonicalURL?: string;
	hideEditPost?: boolean;
	timezone?: string;
	lang?: 'en' | 'vi';
}

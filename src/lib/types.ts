export enum Lang {
	EN = 'en',
	VI = 'vi',
}

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
}

export enum Dir {
	LTR = 'ltr',
	RTL = 'rtl',
	AUTO = 'auto',
}

export const AnimEasing = {
	EASE_OUT_QUART: [0.22, 1, 0.36, 1] as const,
} as const;

export type Language = `${Lang}`;

export type ThemeMode = `${Theme}`;

export interface SiteConfig {
	url: string;
	title: string;
	description: string;
	author: string;
	profile?: string;
	ogImage?: string;
	lang: Language;
	timezone: string;
	dir: Dir;
	googleVerification?: string;
	hero: { title: string; tagline: string };
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
	icon?: string;
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
	author?: string;
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
	location?: string;
	timezone?: string;
	lang?: Language;
}

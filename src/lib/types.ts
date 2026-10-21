import type { Language } from './locale';

export type { Language, TextDirection } from './locale';

export const THEMES = ['light', 'dark'] as const;
export type ThemeMode = (typeof THEMES)[number];

export function isThemeMode(value: unknown): value is ThemeMode {
	return THEMES.some((mode) => mode === value);
}

export interface SiteConfig {
	url: string;
	title: string;
	description: string;
	author: string;
	profile?: string;
	ogImage?: string;
	timezone: string;
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

export interface BlogConfig {
	site: SiteConfig;
	posts: PostsConfig;
	features: FeaturesConfig;
	socials: SocialLink[];
}

export interface PostMeta {
	/** Generated from Markdown; authors do not maintain this field. */
	headings?: import('./content/types').ContentHeading[];
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

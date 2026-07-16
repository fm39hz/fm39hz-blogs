import * as m from '$lib/paraglide/messages';

export interface UIStrings {
	nav: {
		home: string;
		posts: string;
		tags: string;
		about: string;
		archives: string;
		search: string;
	};
	post: {
		publishedAt: string;
		updatedAt: string;
		sharePostIntro: string;
		sharePostOn: (platform: string) => string;
		sharePostViaEmail: string;
		tagLabel: string;
		backToTop: string;
		goBack: string;
		onThisPage: string;
		editPage: string;
		previousPost: string;
		nextPost: string;
		logsCount: (count: number) => string;
		tableOfContents: string;
		tableOfContentsMenu: string;
		closeMenu: string;
		copiedMarkdown: string;
	};
	pagination: { prev: string; next: string; page: string };
	home: {
		socialLinks: string;
		featured: string;
		recentPosts: string;
		allPosts: string;
		heroTitle: string;
		heroTagline: string;
	};
	footer: { copyright: string; allRightsReserved: string };
	pages: {
		tagTitle: string;
		tagDesc: string;
		tagsTitle: string;
		tagsDesc: string;
		postsTitle: string;
		postsDesc: string;
		archivesTitle: string;
		archivesDesc: string;
		searchTitle: string;
		searchDesc: string;
		siteDescription: string;
		searchComingSoon: string;
	};
	a11y: {
		skipToContent: string;
		openMenu: string;
		closeMenu: string;
		toggleTheme: string;
		toggleLanguage: string;
		copyCode: string;
		copyMarkdown: string;
		rssFeed: string;
		rssLinkTitle: string;
		paginationNav: string;
		archiveLink: string;
		searchLink: string;
		searchPlaceholder: string;
		noResults: string;
		goToPreviousPage: string;
		goToNextPage: string;
		navPrimary: string;
	};
	theme: {
		dark: string;
		light: string;
	};
	notFound: { title: string; message: string; goHome: string };
}

export function useTranslations(locale?: string): UIStrings {
	const opt = locale ? { locale: locale as 'en' | 'vi' } : undefined;

	return {
		nav: {
			home: m.nav_home(undefined, opt),
			posts: m.nav_posts(undefined, opt),
			tags: m.nav_tags(undefined, opt),
			about: m.nav_about(undefined, opt),
			archives: m.nav_archives(undefined, opt),
			search: m.nav_search(undefined, opt),
		},
		post: {
			publishedAt: m.post_published_at(undefined, opt),
			updatedAt: m.post_updated_at(undefined, opt),
			sharePostIntro: m.post_share_post_intro(undefined, opt),
			sharePostOn: (platform: string) => m.post_share_post_on({ platform }, opt),
			sharePostViaEmail: m.post_share_post_via_email(undefined, opt),
			tagLabel: m.post_tag_label(undefined, opt),
			backToTop: m.post_back_to_top(undefined, opt),
			goBack: m.post_go_back(undefined, opt),
			onThisPage: m.post_on_this_page(undefined, opt),
			editPage: m.post_edit_page(undefined, opt),
			previousPost: m.post_previous_post(undefined, opt),
			nextPost: m.post_next_post(undefined, opt),
			logsCount: (count: number) => m.post_logs_count({ count }, opt),
			tableOfContents: m.post_table_of_contents(undefined, opt),
			tableOfContentsMenu: m.post_table_of_contents_menu(undefined, opt),
			closeMenu: m.post_close_menu(undefined, opt),
			copiedMarkdown: m.post_copied_markdown(undefined, opt),
		},
		pagination: {
			prev: m.pagination_prev(undefined, opt),
			next: m.pagination_next(undefined, opt),
			page: m.pagination_page(undefined, opt),
		},
		home: {
			socialLinks: m.home_social_links(undefined, opt),
			featured: m.home_featured(undefined, opt),
			recentPosts: m.home_recent_posts(undefined, opt),
			allPosts: m.home_all_posts(undefined, opt),
			heroTitle: m.home_hero_title(undefined, opt),
			heroTagline: m.home_hero_tagline(undefined, opt),
		},
		footer: {
			copyright: m.footer_copyright(undefined, opt),
			allRightsReserved: m.footer_all_rights_reserved(undefined, opt),
		},
		pages: {
			tagTitle: m.pages_tag_title(undefined, opt),
			tagDesc: m.pages_tag_desc(undefined, opt),
			tagsTitle: m.pages_tags_title(undefined, opt),
			tagsDesc: m.pages_tags_desc(undefined, opt),
			postsTitle: m.pages_posts_title(undefined, opt),
			postsDesc: m.pages_posts_desc(undefined, opt),
			archivesTitle: m.pages_archives_title(undefined, opt),
			archivesDesc: m.pages_archives_desc(undefined, opt),
			searchTitle: m.pages_search_title(undefined, opt),
			searchDesc: m.pages_search_desc(undefined, opt),
			siteDescription: m.site_description(undefined, opt),
			searchComingSoon: m.search_coming_soon(undefined, opt),
		},
		a11y: {
			skipToContent: m.a11y_skip_to_content(undefined, opt),
			openMenu: m.a11y_open_menu(undefined, opt),
			closeMenu: m.a11y_close_menu(undefined, opt),
			toggleTheme: m.a11y_toggle_theme(undefined, opt),
			toggleLanguage: m.a11y_toggle_language(undefined, opt),
			copyCode: m.a11y_copy_code(undefined, opt),
			copyMarkdown: m.a11y_copy_markdown(undefined, opt),
			rssFeed: m.a11y_rss_feed(undefined, opt),
			rssLinkTitle: m.a11y_rss_link_title(undefined, opt),
			paginationNav: m.a11y_pagination_nav(undefined, opt),
			archiveLink: m.a11y_archive_link(undefined, opt),
			searchLink: m.a11y_search_link(undefined, opt),
			searchPlaceholder: m.a11y_search_placeholder(undefined, opt),
			noResults: m.a11y_no_results(undefined, opt),
			goToPreviousPage: m.a11y_go_to_previous_page(undefined, opt),
			goToNextPage: m.a11y_go_to_next_page(undefined, opt),
			navPrimary: m.a11y_nav_primary(undefined, opt),
		},
		theme: {
			dark: m.theme_dark(undefined, opt),
			light: m.theme_light(undefined, opt),
		},
		notFound: {
			title: m.not_found_title(undefined, opt),
			message: m.not_found_message(undefined, opt),
			goHome: m.not_found_go_home(undefined, opt),
		},
	};
}

export function tplStr(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
		const value = vars[key];
		return value !== undefined && value !== null ? String(value) : '';
	});
}

import type { Language } from '$lib/locale';
import * as m from '$lib/paraglide/messages';

/** UI copy for a locale; the shape is derived, so messages stay the only source. */
export function useTranslations(locale: Language) {
	const opt = { locale };

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
			copied: m.post_copied(undefined, opt),
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
			copyFigure: m.a11y_copy_figure(undefined, opt),
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
			closeImage: m.a11y_close_image(undefined, opt),
			closeNotification: m.a11y_close_notification(undefined, opt),
			footnote: (number: number) => m.a11y_footnote({ number }, opt),
			diagram: m.a11y_diagram(undefined, opt),
			diagramControls: m.a11y_diagram_controls(undefined, opt),
			/** Keyed by `CheckState` (content contract) so cells index it directly. */
			check: {
				done: m.a11y_check_done(undefined, opt),
				partial: m.a11y_check_partial(undefined, opt),
				todo: m.a11y_check_todo(undefined, opt),
			},
		},
		socialLinkTitle: (site: string, network: string) =>
			m.social_link_title({ site, network }, opt),
		table: {
			cardPosition: (current: number, total: number) =>
				m.table_card_position({ current, total }, opt),
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

export type UIStrings = ReturnType<typeof useTranslations>;

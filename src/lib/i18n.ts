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
		sharePostOn: string;
		sharePostViaEmail: string;
		tagLabel: string;
		backToTop: string;
		goBack: string;
		editPage: string;
		previousPost: string;
		nextPost: string;
	};
	pagination: { prev: string; next: string; page: string };
	home: { socialLinks: string; featured: string; recentPosts: string; allPosts: string };
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
	};
	a11y: {
		skipToContent: string;
		openMenu: string;
		closeMenu: string;
		toggleTheme: string;
		toggleLanguage: string;
		copyCode: string;
		rssFeed: string;
		rssLinkTitle: string;
		paginationNav: string;
		archiveLink: string;
		searchLink: string;
		searchPlaceholder: string;
		noResults: string;
		goToPreviousPage: string;
		goToNextPage: string;
	};
	notFound: { title: string; message: string; goHome: string };
}

const en: UIStrings = {
	nav: {
		home: 'Home',
		posts: 'Articles',
		tags: 'Topics',
		about: 'Author',
		archives: 'Archives',
		search: 'Find',
	},
	post: {
		publishedAt: 'Published at',
		updatedAt: 'Updated',
		sharePostIntro: 'Share this post:',
		sharePostOn: 'Share this post on {{platform}}',
		sharePostViaEmail: 'Share this post via email',
		tagLabel: 'Tags',
		backToTop: 'Back to top',
		goBack: 'Go back',
		editPage: 'Edit page',
		previousPost: 'Previous Post',
		nextPost: 'Next Post',
	},
	pagination: { prev: 'Prev', next: 'Next', page: 'Page' },
	home: {
		socialLinks: 'Social Links',
		featured: 'Highlights',
		recentPosts: 'Recent Entries',
		allPosts: 'View all notes →',
	},
	footer: { copyright: 'Copyright', allRightsReserved: 'All rights reserved.' },
	pages: {
		tagTitle: 'Index',
		tagDesc: 'All the articles with the index card',
		tagsTitle: 'Index',
		tagsDesc: 'All the index cards used in posts.',
		postsTitle: 'Articles',
		postsDesc: "All the articles I've logged.",
		archivesTitle: 'Archives',
		archivesDesc: "All the entries I've archived.",
		searchTitle: 'Find',
		searchDesc: 'Find any articles ...',
	},
	a11y: {
		skipToContent: 'Skip to content',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		toggleTheme: 'Toggle theme',
		toggleLanguage: 'Switch language',
		copyCode: 'Copy code block',
		rssFeed: 'RSS Feed',
		rssLinkTitle: 'RSS',
		paginationNav: 'Pagination Navigation',
		archiveLink: 'Binder',
		searchLink: 'Find',
		searchPlaceholder: 'Search notes...',
		noResults: 'No results found',
		goToPreviousPage: 'Go to previous page',
		goToNextPage: 'Go to next page',
	},
	notFound: { title: '404 Not Found', message: 'Page Not Found', goHome: 'Go back home' },
};

const vi: UIStrings = {
	nav: {
		home: 'Trang chủ',
		posts: 'Bài viết',
		tags: 'Chủ đề',
		about: 'Tác giả',
		archives: 'Lưu trữ',
		search: 'Tìm kiếm',
	},
	post: {
		publishedAt: 'Đăng vào',
		updatedAt: 'Cập nhật',
		sharePostIntro: 'Chia sẻ bài viết:',
		sharePostOn: 'Chia sẻ lên {{platform}}',
		sharePostViaEmail: 'Chia sẻ qua email',
		tagLabel: 'Thẻ',
		backToTop: 'Lên đầu',
		goBack: 'Quay lại',
		editPage: 'Sửa trang',
		previousPost: 'Bài trước',
		nextPost: 'Bài sau',
	},
	pagination: { prev: 'Trước', next: 'Sau', page: 'Trang' },
	home: {
		socialLinks: 'Liên kết',
		featured: 'Đánh dấu',
		recentPosts: 'Bài viết gần đây',
		allPosts: 'Xem toàn bộ bài viết →',
	},
	footer: { copyright: 'Bản quyền', allRightsReserved: 'Đã được bảo lưu.' },
	pages: {
		tagTitle: 'Chủ đề',
		tagDesc: 'Tất cả bài viết theo thẻ',
		tagsTitle: 'Chủ đề',
		tagsDesc: 'Tất cả thẻ phân loại bài viết.',
		postsTitle: 'Bài viết',
		postsDesc: 'Tất cả bài viết đã đăng.',
		archivesTitle: 'Lưu trữ',
		archivesDesc: 'Tất cả bài viết đã lưu trữ.',
		searchTitle: 'Tìm kiếm',
		searchDesc: 'Tìm kiếm bài viết ...',
	},
	a11y: {
		skipToContent: 'Bỏ qua nội dung',
		openMenu: 'Mở menu',
		closeMenu: 'Đóng menu',
		toggleTheme: 'Chuyển giao diện',
		toggleLanguage: 'Chuyển ngôn ngữ',
		copyCode: 'Sao chép code',
		rssFeed: 'RSS',
		rssLinkTitle: 'RSS',
		paginationNav: 'Phân trang',
		archiveLink: 'Lưu trữ',
		searchLink: 'Tìm kiếm',
		searchPlaceholder: 'Tìm bài viết...',
		noResults: 'Không tìm thấy kết quả',
		goToPreviousPage: 'Đến trang trước',
		goToNextPage: 'Đến trang sau',
	},
	notFound: {
		title: '404 Không tìm thấy',
		message: 'Trang không tồn tại',
		goHome: 'Về trang chủ',
	},
};

const translations: Record<string, UIStrings> = { en, vi };

export function useTranslations(locale?: string): UIStrings {
	return translations[locale ?? 'en'] ?? en;
}

export function tplStr(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
		const value = vars[key];
		return value !== undefined && value !== null ? String(value) : '';
	});
}

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
		posts: 'Posts',
		tags: 'Tags',
		about: 'About',
		archives: 'Archives',
		search: 'Search',
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
		featured: 'Featured',
		recentPosts: 'Recent Posts',
		allPosts: 'All Posts',
	},
	footer: { copyright: 'Copyright', allRightsReserved: 'All rights reserved.' },
	pages: {
		tagTitle: 'Tag',
		tagDesc: 'All the articles with the tag',
		tagsTitle: 'Tags',
		tagsDesc: 'All the tags used in posts.',
		postsTitle: 'Posts',
		postsDesc: "All the articles I've posted.",
		archivesTitle: 'Archives',
		archivesDesc: "All the articles I've archived.",
		searchTitle: 'Search',
		searchDesc: 'Search any article ...',
	},
	a11y: {
		skipToContent: 'Skip to content',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		toggleTheme: 'Toggle theme',
		searchPlaceholder: 'Search posts...',
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
		tags: 'Thẻ',
		about: 'Giới thiệu',
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
		featured: 'Nổi bật',
		recentPosts: 'Gần đây',
		allPosts: 'Tất cả',
	},
	footer: { copyright: 'Bản quyền', allRightsReserved: 'Đã được bảo lưu.' },
	pages: {
		tagTitle: 'Thẻ',
		tagDesc: 'Tất cả bài viết với thẻ',
		tagsTitle: 'Thẻ',
		tagsDesc: 'Tất cả thẻ được sử dụng.',
		postsTitle: 'Bài viết',
		postsDesc: 'Tất cả bài viết tôi đã đăng.',
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
		searchPlaceholder: 'Tìm bài viết...',
		noResults: 'Không tìm thấy',
		goToPreviousPage: 'Trang trước',
		goToNextPage: 'Trang sau',
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

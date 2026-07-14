import { Lang, MD_EXT_REGEX, SLUG_REGEX } from '$lib/constants';

export function parseSlug(fileName: string): string {
	return fileName.replace(SLUG_REGEX, '').replace(MD_EXT_REGEX, '');
}

export function parseLang(fileName: string, fallback = Lang.EN): string {
	return (fileName.match(SLUG_REGEX)?.[1] ?? fallback) as string;
}

import { Lang } from '$lib/constants';
import { contentLocale, contentSlug } from '../content-language';

export function parseSlug(fileName: string): string {
	return contentSlug(fileName);
}

export function parseLang(fileName: string, fallback = Lang.EN): string {
	return contentLocale(fileName, undefined, fallback);
}

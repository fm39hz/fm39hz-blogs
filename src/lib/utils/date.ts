import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import vi from 'dayjs/locale/vi';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { Language } from '$lib/locale';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT = 'D MMM, YYYY';
/** Locale-neutral form for signatures and plain-text exports (copied Markdown). */
const NUMERIC_DATE_FORMAT = 'DD/MM/YYYY';

/** Every site language needs its dayjs locale; a missing key is a type error. */
const DATE_LOCALES: Record<Language, ILocale> = { en, vi };

/** The instant in the site timezone, so server prerender and browser agree on the day. */
function inZone(dateStr: string, timezoneStr?: string) {
	const parsed = dayjs(dateStr);
	return timezoneStr ? parsed.tz(timezoneStr) : parsed;
}

export function formatDate(dateStr: string, timezoneStr: string, locale: Language): string {
	return inZone(dateStr, timezoneStr).locale(DATE_LOCALES[locale]).format(DATE_FORMAT);
}

export function formatNumericDate(dateStr: string, timezoneStr: string): string {
	return inZone(dateStr, timezoneStr).format(NUMERIC_DATE_FORMAT);
}

export function formatISO(dateStr: string, timezoneStr?: string): string {
	return inZone(dateStr, timezoneStr).toISOString();
}

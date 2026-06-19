import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT = 'D MMM, YYYY';

export function formatDate(dateStr: string, timezoneStr?: string, locale?: string): string {
	const parsed = dayjs(dateStr);
	const localised = timezoneStr ? parsed.tz(timezoneStr) : parsed;
	return localised.locale(locale ?? 'en').format(DATE_FORMAT);
}

export function formatISO(dateStr: string, timezoneStr?: string): string {
	const parsed = dayjs(dateStr);
	const localised = timezoneStr ? parsed.tz(timezoneStr) : parsed;
	return localised.toISOString();
}

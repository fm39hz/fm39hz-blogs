import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(d: string, tz: string, locale = 'en'): string {
	return dayjs(d).tz(tz).locale(locale).format('D MMM, YYYY');
}

export function formatISO(d: string, tz: string): string {
	return dayjs(d).tz(tz).toISOString();
}

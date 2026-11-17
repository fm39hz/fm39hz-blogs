import kebabcase from 'lodash.kebabcase';
import slugify from 'slugify';

export function slugifyStr(str: string): string {
	if (/[^ -~]/.test(str)) return kebabcase(str);
	return slugify(str, { lower: true });
}

export function slugifyAll(arr: string[]): string[] {
	return arr.map((s) => slugifyStr(s));
}

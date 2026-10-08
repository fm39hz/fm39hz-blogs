import { addCollection } from '@iconify/svelte/dist/offline-functions';
import phosphor from './phosphor-icons.json';

addCollection(phosphor);

const bundledIcons = new Set(
	Object.keys(phosphor.icons).map((name) => `${phosphor.prefix}:${name}`),
);

export function isBundledIcon(name: string): boolean {
	return bundledIcons.has(name);
}

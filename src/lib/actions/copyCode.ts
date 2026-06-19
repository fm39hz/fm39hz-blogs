import { mount } from 'svelte';
import CopyButton from '$lib/components/CopyButton.svelte';

export function copyCode(node: HTMLElement) {
	const preBlocks = node.querySelectorAll<HTMLPreElement>('pre');
	const instances: Record<string, any> = {};

	for (const pre of preBlocks) {
		const wrapper = document.createElement('div');
		wrapper.style.position = 'relative';
		pre.parentNode?.insertBefore(wrapper, pre);
		wrapper.appendChild(pre);

		pre.setAttribute('tabindex', '0');

		const anchor = document.createElement('div');
		wrapper.appendChild(anchor);

		const id = `copy-${Math.random().toString(36).slice(2, 8)}`;
		const instance = mount(CopyButton, { target: anchor, props: { target: pre } });
		instances[id] = instance;
	}

	return {
		destroy() {
			Object.values(instances).forEach((i: any) => {
				i?.destroy?.();
			});
		},
	};
}

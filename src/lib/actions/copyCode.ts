import { mount } from 'svelte';
import CopyButton from '$lib/components/ui/CopyButton/CopyButton.svelte';

export function copyCode(container: HTMLElement) {
	const codeBlocks = container.querySelectorAll<HTMLPreElement>('pre');
	const mounted: ReturnType<typeof mount>[] = [];

	for (const block of codeBlocks) {
		const wrapper = document.createElement('div');
		wrapper.style.position = 'relative';
		block.parentNode?.insertBefore(wrapper, block);
		wrapper.appendChild(block);
		block.setAttribute('tabindex', '0');

		const anchor = document.createElement('div');
		wrapper.appendChild(anchor);

		const instance = mount(CopyButton, { target: anchor, props: { target: block } });
		mounted.push(instance);
	}

	return {
		destroy() {
			for (const instance of mounted) instance?.destroy?.();
		},
	};
}

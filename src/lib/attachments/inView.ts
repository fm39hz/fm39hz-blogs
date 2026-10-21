import type { Attachment } from 'svelte/attachments';

/**
 * Report viewport visibility of the attached node. Read-only: the caller turns
 * it into state and the template renders the consequence (no DOM writes here).
 */
export function inView(
	onChange: (visible: boolean) => void,
	rootMargin = '10% 0px 10% 0px',
): Attachment<Element> {
	return (node) => {
		const io = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting), {
			rootMargin,
			threshold: 0,
		});
		io.observe(node);
		return () => io.disconnect();
	};
}

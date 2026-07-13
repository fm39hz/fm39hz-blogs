<script lang="ts">
import { browser } from '$app/environment';
import { prefersReducedMotion } from '$lib/animations/reduce';
import { AnimDurationMs } from '$lib/constants';
import styles from './TagPill.module.scss';

let {
	tag,
	tagName,
	size = 'lg',
}: {
	tag: string;
	tagName: string;
	size?: 'sm' | 'lg';
} = $props();

function roughTagAction(node: HTMLElement) {
	if (!browser) return;

	(async () => {
		const { annotate } = await import('rough-notation');

		const getCSSVar = (name: string): string => {
			return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
		};

		const baseColor = getCSSVar('--accent') || '#8b5cf6';
		const color = `color-mix(in srgb, ${baseColor} 18%, transparent)`;

		const ann = annotate(node, {
			type: 'highlight',
			color,
			animate: !prefersReducedMotion(),
			animationDuration: AnimDurationMs.scene,
		});

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						ann.show();
						observer.unobserve(node);
					}
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(node);
	})();
}
</script>

<li class={styles.tag}>
  <a href="/topics/{tag}/" class={styles[size]} use:roughTagAction>
    #{tagName}
  </a>
</li>

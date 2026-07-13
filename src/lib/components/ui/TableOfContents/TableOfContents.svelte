<script lang="ts">
import { onMount } from 'svelte';
import { browser } from '$app/environment';
import styles from './TableOfContents.module.scss';

let headings = $state<{ id: string; text: string; level: number }[]>([]);
let activeId = $state<string>('');
let containerEl = $state<HTMLElement | null>(null);

$effect(() => {
	if (!activeId || !containerEl) return;
	const activeLink = containerEl.querySelector(`.${styles.active}`);
	if (activeLink) {
		activeLink.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	}
});

onMount(() => {
	const prose = document.querySelector('.prose');
	if (!prose) return;

	const elements = prose.querySelectorAll<HTMLHeadingElement>('h2, h3');
	const items = Array.from(elements).map((el) => {
		if (!el.id) {
			const text = el.textContent ?? '';
			el.id = text
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');
		}
		return {
			id: el.id,
			text: el.textContent ?? '',
			level: Number.parseInt(el.tagName.substring(1)),
		};
	});
	headings = items;

	if (items.length === 0) return;

	const headingStates = new Map<string, boolean>();
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				headingStates.set(entry.target.id, entry.isIntersecting);
			}

			let firstVisibleId = '';
			for (const item of items) {
				if (headingStates.get(item.id)) {
					firstVisibleId = item.id;
					break;
				}
			}

			if (firstVisibleId) {
				activeId = firstVisibleId;
			} else {
				const scrollY = window.scrollY;
				let lastAboveId = items[0].id;
				for (const item of items) {
					const el = document.getElementById(item.id);
					if (el && el.offsetTop - 120 < scrollY) {
						lastAboveId = item.id;
					} else {
						break;
					}
				}
				activeId = lastAboveId;
			}
		},
		{
			rootMargin: '-80px 0px -60% 0px',
		},
	);

	for (const item of items) {
		const el = document.getElementById(item.id);
		if (el) observer.observe(el);
	}

	return () => {
		observer.disconnect();
	};
});
</script>

{#if browser && headings.length > 0}
  <nav bind:this={containerEl} class={styles.wrapper} aria-label="Table of contents">
    <div class={styles.title}>On this page</div>
    <ul class={styles.list}>
      {#each headings as { id, text, level }}
        <li class={`${styles.item} ${styles[`level-${level}`]}`}>
          <a
            href="#{id}"
            class={`${styles.link} ${activeId === id ? styles.active : ''}`}
            onclick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              history.pushState(null, '', `#${id}`);
            }}
          >
            {text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

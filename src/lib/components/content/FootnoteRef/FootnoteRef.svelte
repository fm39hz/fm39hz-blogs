<script lang="ts">
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { Attachment } from 'svelte/attachments';
import { useTranslations } from '$lib/i18n';
import { locale } from '$lib/i18n-state.svelte';
import type { FootnoteRefProps } from '../contract';
import styles from './FootnoteRef.module.scss';

/**
 * Footnote reference with an inline popup (rehypeFootnotes).
 *   - mouse hover / keyboard focus: preview while pointed at
 *   - click / tap: pin open until clicking elsewhere, Escape, or clicking the number again
 * Scrolling never closes a pinned popup: dismissal listens for `click`, which a
 * scroll gesture does not produce. The link still targets the footnote list for no-JS.
 */
let { number, id, html }: FootnoteRefProps = $props();

/** Grace period for moving the pointer from the number into the popup. */
const HOVER_EXIT_MS = 150;
const popupId = $props.id();

let t = $derived(useTranslations(locale.value));
let root = $state<HTMLElement>();
let anchor = $state<HTMLElement>();
let previewing = $state(false);
let pinned = $state(false);
let open = $derived(previewing || pinned);
let position = $state({ x: 0, y: 0 });
$effect(() => () => clearTimeout(exitTimer));

let exitTimer: ReturnType<typeof setTimeout> | undefined;

function preview(on: boolean) {
	clearTimeout(exitTimer);
	if (on) previewing = true;
	else exitTimer = setTimeout(() => (previewing = false), HOVER_EXIT_MS);
}

function close() {
	clearTimeout(exitTimer);
	pinned = false;
	previewing = false;
}

function onPointer(event: PointerEvent, on: boolean) {
	// Touch "hover" is synthetic; touch interaction goes through click instead.
	if (event.pointerType === 'mouse') preview(on);
}

function toggle(event: MouseEvent) {
	event.preventDefault();
	if (pinned) close();
	else pinned = true;
}

function onDocumentClick(event: MouseEvent) {
	if (pinned && event.target instanceof Node && !root?.contains(event.target)) close();
}

function onKeydown(event: KeyboardEvent) {
	if (open && event.key === 'Escape') close();
}

/** Keep the popup next to its number (flip/shift at viewport edges); reads geometry only. */
const place: Attachment<HTMLElement> = (popup) => {
	if (!anchor) return;
	const reference = anchor;
	let active = true;
	const cleanup = autoUpdate(reference, popup, async () => {
		const { x, y } = await computePosition(reference, popup, {
			placement: 'top',
			strategy: 'absolute',
			middleware: [offset(6), flip(), shift({ padding: 8 })],
		});
		if (active) position = { x, y };
	});
	return () => {
		active = false;
		cleanup();
	};
};
</script>

<svelte:document onclick={onDocumentClick} />
<svelte:window onkeydown={onKeydown} />

<span class={styles.root} bind:this={root}>
  <a
    bind:this={anchor}
    class={styles.ref}
    href="#fn-{id}"
    aria-label={t.a11y.footnote(number)}
    aria-describedby={open ? popupId : undefined}
    aria-expanded={open}
    onclick={toggle}
    onpointerenter={(e) => onPointer(e, true)}
    onpointerleave={(e) => onPointer(e, false)}
    onfocus={() => preview(true)}
    onblur={() => preview(false)}
  >{number}</a>
  {#if open}
    <span
      id={popupId}
      class={styles.popup}
      role="tooltip"
      data-pinned={pinned || undefined}
      style:left="{position.x}px"
      style:top="{position.y}px"
      onpointerenter={(e) => onPointer(e, true)}
      onpointerleave={(e) => onPointer(e, false)}
      {@attach place}
    >
      <span class={styles.number}>({number})</span>
      {@html html}
    </span>
  {/if}
</span>

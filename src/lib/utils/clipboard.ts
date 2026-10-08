import { animationDurationMs } from '$lib/design-system/tokens/animation';
import { globalToaster } from '$lib/state/toast.svelte';

export async function copyText(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

/** Toast + optional local `copied` flash (shared success grammar). */
export function flashCopySuccess(opts: {
	toast: string;
	setCopied?: (v: boolean) => void;
	ms?: number;
}): void {
	opts.setCopied?.(true);
	globalToaster.addToast({ data: opts.toast });
	if (opts.setCopied) {
		const ms = opts.ms ?? animationDurationMs('theme');
		setTimeout(() => opts.setCopied?.(false), ms);
	}
}

/** Clipboard write then shared success feedback. */
export async function copyWithFeedback(
	text: string,
	opts: {
		toast: string;
		setCopied?: (v: boolean) => void;
		ms?: number;
	},
): Promise<boolean> {
	const ok = await copyText(text);
	if (!ok) return false;
	flashCopySuccess(opts);
	return true;
}

<script lang="ts">
import Icon from '@iconify/svelte';

let { target: pre }: { target: HTMLPreElement } = $props();
let copied = $state(false);

async function handleCopy() {
	const code = pre.querySelector('code');
	if (!code) return;
	await navigator.clipboard.writeText(code.innerText);
	copied = true;
	setTimeout(() => (copied = false), 700);
}
</script>

<button
	onclick={handleCopy}
	class="copy-code absolute end-3 -top-3"
	class:copied
	aria-label="Copy code"
	title="Copy code block"
>
	<Icon icon={copied ? 'ph:check' : 'ph:clipboard-text'} class="size-3.5" />
</button>

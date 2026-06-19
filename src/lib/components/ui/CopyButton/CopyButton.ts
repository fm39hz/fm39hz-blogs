export async function copyCode(codeBlock: HTMLPreElement): Promise<boolean> {
	const code = codeBlock.querySelector('code');
	if (!code) return false;
	await navigator.clipboard.writeText(code.innerText);
	return true;
}

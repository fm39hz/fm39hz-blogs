interface Navigation {
	from: URL | null;
	to: URL | null;
	type: 'link' | 'form' | 'goto' | 'popstate';
	complete: Promise<void>;
	willUnload: boolean;
}

export function viewTransition(navigation: Navigation): Promise<void> | void {
	if (!document.startViewTransition) return;
	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
}

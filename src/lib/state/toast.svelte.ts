import { Toaster } from 'melt/builders';

// Global toaster instance for copy notifications and warnings
export const globalToaster = new Toaster<string>({
	closeDelay: 3000,
});

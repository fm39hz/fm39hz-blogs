export function GET(): Response {
	return new Response(null, {
		status: 308,
		headers: { location: '/favicon.png' },
	});
}

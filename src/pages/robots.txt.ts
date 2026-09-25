import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('/sitemap.xml', site);
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};

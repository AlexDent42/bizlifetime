import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const xmlEscape = (value: string) => value
	.replaceAll('&', '&amp;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;')
	.replaceAll('"', '&quot;')
	.replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
	const articles = await getCollection('articles', ({ data }) => !data.draft);
	const urls = [
		`  <url><loc>${xmlEscape(new URL('/', site).href)}</loc></url>`,
		...articles.map((article) => {
			const loc = xmlEscape(new URL(`/articles/${encodeURIComponent(article.id)}/`, site).href);
			const lastmodDate = article.data.updatedDate ?? article.data.pubDate;
			const lastmod = lastmodDate.toISOString().slice(0, 10);
			return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
		}),
	].join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};

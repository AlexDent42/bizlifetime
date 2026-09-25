# BizLifetime

A lightweight Astro blog about building a steady small business for the long term.

## Local development

```sh
npm install
npm run dev
```

## Articles

Write articles as Markdown files in `src/content/articles/`. Each article needs a title, description, publication date, category, image path, image alt text, and draft flag in its frontmatter. New articles marked `draft: false` appear on the home page, receive a page at `/articles/<filename>/`, and are included in the generated `/sitemap.xml`.

Keep `draft: true` until an article is ready to publish. The sitemap and home page exclude drafts.

## Build and preview

```sh
npm run build
npm run preview
```

The static production site is generated in `dist/`. Cloudflare Pages uses `npm run build` as its build command and `dist` as its build output directory.

## SEO files

- `src/pages/robots.txt.ts` generates `/robots.txt` and points to `https://bizlifetime.com/sitemap.xml`.
- `src/pages/sitemap.xml.ts` generates an XML sitemap containing the home page and published articles at build time.
- `astro.config.mjs` sets the canonical production site URL used in page metadata and sitemap links.

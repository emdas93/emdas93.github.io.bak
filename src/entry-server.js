import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';
import { renderSSRHead } from '@unhead/ssr';

export async function render(url, manifest) {
	const { app, router, head } = createApp();

	await router.push({ path: url });
	await router.isReady();

	const ctx = {};
	const appHtml = await renderToString(app, ctx);
	// const { renderMeta } = renderMetaToString(app)
	// const { htmlAttrs, bodyAttrs, headTags, bodyTags } = renderMeta()

	// Generate preload links
	const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

	const payload = await renderSSRHead(head)

	return {
		appHtml,
		preloadLinks,
		htmlAttrs: payload.htmlAttrs,
		bodyAttrs: payload.bodyAttrs,
		headTags: payload.headTags,
		bodyTags: payload.bodyTags,
		bodyTagsOpen: payload.bodyTagsOpen,
	};
}

function renderPreloadLinks(modules, manifest) {
	let links = '';
	const seen = new Set();
	modules.forEach((id) => {
		const files = manifest[id];
		if (files) {
			files.forEach((file) => {
				if (!seen.has(file)) {
					seen.add(file);
					const filename = file;
					if (filename.endsWith('.js')) {
						links += `<link rel="modulepreload" href="${filename}">`;
					} else if (filename.endsWith('.css')) {
						links += `<link rel="stylesheet" href="${filename}">`;
					}
				}
			});
		}
	});
	return links;
}

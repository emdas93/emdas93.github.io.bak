// sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import fs from 'fs'
import path from 'path'


const staticFiles = fs.readdirSync(('src/posts')).map((file) => {
	const routeName = '/post/' + file.replace(/\.md$/, '');
	return {
		url: routeName,
		changefreq: 'daily',
		priority: 1
	};
});

for (let i in staticFiles) {
	if (staticFiles[i].url === '/post/template') {
		staticFiles.splice(i, 1);
	}
}
const links = [
	{ url: '/', changefreq: 'daily', priority: 0.9 },
	{ url: '/about', changefreq: 'monthly', priority: 0.7 }
]

const stream = new SitemapStream({ hostname: 'https://emdas93.github.io' })

Readable.from(staticFiles).pipe(stream).pipe(fs.createWriteStream('dist/static/sitemap.xml'))

streamToPromise(stream).then((sm) => console.log('Sitemap created!'))

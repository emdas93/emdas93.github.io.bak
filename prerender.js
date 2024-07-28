// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(
	fs.readFileSync(toAbsolute('dist/client/.vite/ssr-manifest.json'), 'utf-8'),
)
const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// determine routes to pre-render from src/pages
// const routesToPrerender = fs
// .readdirSync(toAbsolute('src/pages'))
// 	.map((file) => {
// 		const name = file.replace(/\.vue$/, '').toLowerCase()
// 		return name === 'home' ? `/` : `/${name}`
// 	})
const routesToPrerender = fs.readdirSync(toAbsolute('src/posts')).map((file) => {
	const routeName = '/post/' + file.replace(/\.md$/, '');
	return routeName;
});

for (let i in routesToPrerender) {
	if (routesToPrerender[i] === '/post/template') {
		routesToPrerender.splice(i, 1);
	}
}

routesToPrerender.push('/');

; (async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		const { appHtml, preloadLinks, headTags, htmlAttrs, bodyAttrs, bodyTags } = await render(url, manifest)

		const html = template
			.replace('<!--htmlAttrs-->', htmlAttrs)
			.replace('<!--headTags-->', headTags)
			.replace('<!--bodyAttrs-->', bodyAttrs)
			.replace('<!--bodyTags-->', bodyTags)
			.replace(`<!--preload-links-->`, preloadLinks)
			.replace(`<!--app-html-->`, appHtml)

		const filePath = 'dist/static' + url + '/index.html'


		const fileDirName = path.dirname(filePath);
		console.log(fileDirName);
		const existDirectory = fs.existsSync(fileDirName);
		if (!existDirectory) {
			fs.mkdirSync(fileDirName, { recursive: true });
		}

		fs.writeFileSync(toAbsolute(filePath), html)
		console.log('pre-rendered:', filePath)
	}

	await copyFolderSync('dist/client/assets', 'dist/static/assets')
	// done, delete .vite directory including ssr manifest
	// fs.rmSync(toAbsolute('dist/static/.vite'), { recursive: true })
})()

function copyFolderSync(source, destination) {
	// destination 폴더가 없으면 생성
	if (!fs.existsSync(destination)) {
		fs.mkdirSync(destination);
	}

	// source 폴더의 항목들을 읽음
	const items = fs.readdirSync(source);

	// 각 항목을 복사
	items.forEach(item => {
		const sourcePath = path.join(source, item);
		const destinationPath = path.join(destination, item);

		// 항목이 디렉토리인지 파일인지 확인
		if (fs.lstatSync(sourcePath).isDirectory()) {
			// 디렉토리인 경우 재귀적으로 복사
			copyFolderSync(sourcePath, destinationPath);
		} else {
			// 파일인 경우 파일 복사
			fs.copyFileSync(sourcePath, destinationPath);
		}
	});
}
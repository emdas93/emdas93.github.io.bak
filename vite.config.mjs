// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import VueRouter from 'unplugin-vue-router/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs';
import path from 'path';

// Markdown Utilities
import rawPlugin from 'vite-raw-plugin';
import matter from 'gray-matter';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// Get Post List
const getPosts = () => {
	const postList = [];
	const postsDirectory = path.resolve(__dirname, 'src/posts');
	const files = fs.readdirSync(postsDirectory);
	files.forEach((item) => {
		if (item !== 'assets' && item !== 'template.md') {
			let post = {};
			const data = fs.readFileSync(path.resolve(postsDirectory, item));
			const mtr = matter(data);
			let matData = mtr.data;
			item.lastIndexOf('.');

			matData.filename = item.substr(0, item.lastIndexOf('.'));

			postList.push(matData);
		}

	})
	console.log(process.env.NODE_ENV)
	return postList;
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VueRouter(),
		Vue({
			template: { transformAssetUrls }
		}),
		// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
		Vuetify({
			autoImport: true,
			styles: {
				configFile: 'src/styles/settings.scss',
			},
		}),
		Components(),
		ViteFonts({
			google: {
				families: [{
					name: 'Roboto',
					styles: 'wght@100;300;400;500;700;900',
				}],
			},
		}),
		rawPlugin({
			fileRegex: /\.md$/
		}),
		nodePolyfills({
			// To add only specific polyfills, add them here. If no option is passed, adds all polyfills
			include: ['path'],
			// To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
			exclude: [
				'http', // Excludes the polyfill for `http` and `node:http`.
			],
			// Whether to polyfill specific globals.
			globals: {
				Buffer: true, // can also be 'build', 'dev', or false
				global: true,
				process: true,
				localStorage: true,
			},
			// Override the default polyfills for specific modules.
			overrides: {
				// Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
				fs: 'memfs',
			},
			// Whether to polyfill `node:` protocol imports.
			protocolImports: true,
		}),
	],
	define: { 'process.env': {} },
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~': fileURLToPath(new URL('./node_modules', import.meta.url))
		},
		extensions: [
			'.js',
			'.json',
			'.jsx',
			'.mjs',
			'.ts',
			'.tsx',
			'.vue',
		],
	},
	ssr: {
		noExternal: ['vuetify'],
	},
	server: {
		port: 3000,
	},
})

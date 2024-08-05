import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

// Markdown Imports ----------------------------------*/
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
// import markdownItToc from 'markdown-it-table-of-contents';
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import matter from 'gray-matter';
import uslug from "uslug";
/*----------------------------------------------------*/

export const usePostStore = defineStore('post', {
	id: 'post',
	store: () => {
		return {
			slug: '',
			markdownFileList: undefined,
			markdownFile: {},
			matterObject: {},
			frontmatter: {},
			toc: '',
			content: '',
			tocElement: {},
		}
	},

	getters: {
	},

	actions: {
		async fetchContent() {

			const route = useRoute();

			this.slug = route.params.slug;

			const md = markdownIt({ html: true })
				.use(markdownItAnchor, {slugify: (s) => { return uslug(s) },})
				.use(markdownItTocDoneRight, {
					containerClass: 'toc', // TOC 컨테이너 클래스 설정
					slugify: (s) => { return uslug(s) },
					callback: (html, ast) => {
						this.toc = html;
					}
				});


			this.markdownFile = await this.markdownFileLoad(this.slug);

			this.matterObject = matter(this.markdownFile);

			this.frontmatter = this.matterObject.data;

			this.content = md.render(this.matterObject.content);
		},

		async markdownFileLoad(filename) {
			try {
				const filePath = `/src/posts/${filename}.md`;
				await this.markdownListLoad();

				if (this.markdownFileList[filePath]) {
					const module = await this.markdownFileList[filePath]();
					return module.default;
				} else {
					console.error(`File ${filename}.md not found`);
					return '';
				}
			} catch (error) {
				console.error(`Failed to load ${filename}.md`, error);
				return '';
			}
		},
		async markdownListLoad() {
			if (this.markdownFileList === undefined) {
				this.markdownFileList = await import.meta.glob('/src/posts/*.md');
			}
		}
	}

});
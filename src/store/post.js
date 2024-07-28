import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

// Markdown Imports ----------------------------------*/
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItToc from 'markdown-it-table-of-contents';
import matter from 'gray-matter';
/*----------------------------------------------------*/

export const usePostStore = defineStore('post', {
	id: 'post',
	store: () => {
		return {
			slug: '',
			markdownFiles: undefined,
			markdownFile: {},
			matterObject: {},
			frontmatter: {},
			content: 'TESET',
		}
	},

	getters: {
	},

	actions: {
		async fetchContent() {

			const route = useRoute();

			this.slug = route.params.slug;

			const md = markdownIt({
				html: true
			}).use(markdownItAnchor)
				.use(markdownItToc, {
					includeLevel: [1, 2, 3]
				})
				;

			this.markdownFile = await this.markdownFileLoad(this.slug);

			this.matterObject = matter(this.markdownFile);

			this.frontmatter = this.matterObject.data;

			this.content = md.render(this.matterObject.content);
		},

		async markdownFileLoad(filename) {
			try {
				const filePath = `/src/posts/${filename}.md`;
				await this.markdownListLoad();

				if (this.markdownFiles[filePath]) {
					const module = await this.markdownFiles[filePath]();
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
			if (this.markdownFiles === undefined) {
				this.markdownFiles = await import.meta.glob('/src/posts/*.md');
			}
		}
	}

});
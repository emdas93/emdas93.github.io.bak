<template>
	<v-container>
		<v-row class="flex-wrap-reverse">
			<v-col cols="12" md="1">
			</v-col>
			<v-col cols="12" md="8" class="content-container">
				<h1 class="text-center text-h5">{{ postStore.frontmatter.title }}</h1>
				<p class="text-center text-caption">{{ postStore.frontmatter.created_at }}</p>
				<div class="text-center">
					<v-chip v-for="tag in postStore.frontmatter.tags" class="mt-2 me-1 mb-2 ms-1 text-caption"
						size="small">
						{{ tag }}
					</v-chip>
				</div>
				<v-container v-on:click="test" v-html="postStore.content"
					:data-theme="mainStore.getIsDarkTheme() ? 'dark' : 'light'" class="markdown-body mt-2">
				</v-container>
				<Utterances :key="mainStore.getIsDarkTheme()" />
			</v-col>
			<v-col cols="12" md="3">
				<TocContainer :content="postStore.toc" class="position-fixed" />
			</v-col>
		</v-row>
	</v-container>
</template>
<script setup>
import { ref, onMounted, watch, onServerPrefetch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead, useSeoMeta } from '@unhead/vue';
import { usePostStore } from '@/store/post';
import { useMainStore } from '@/store/main';

// Markdown Imports ----------------------------------*/
import markdownIt from 'markdown-it';
import matter from 'gray-matter';
/*----------------------------------------------------*/

// Import Components ---------------------------------*/
import Utterances from '@/components/Utterances.vue';
import TocContainer from '@/components/TocContainer.vue';
/*----------------------------------------------------*/



// View에 렌더링 될 프로트매터와 컨텐츠
const frontmatter = ref({});
const content = ref('');
const isDarkTheme = ref(false);

// 라우터로부터 Slug 가져오기
const route = useRoute();
const slug = ref(route.params.slug);

const postStore = usePostStore();
const mainStore = useMainStore();

// Client Side Render
onMounted(async () => {
});

watch(() => route.params.slug, (newSlug, oldSlug) => {
	slug.value = newSlug;
	postStore.fetchContent();
});

await postStore.fetchContent();
useSeoMeta({
	title: 'emdas93 - ' + postStore.frontmatter.title,
	description: postStore.frontmatter.description,
	ogDescription: postStore.frontmatter.description,
	ogTitle: 'emdas93 - ' + postStore.frontmatter.title,
	ogImage: 'https://example.com/image.png',
	twitterCard: 'summary_large_image',
})


</script>

<style>
/* .content-container {
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  padding: 20px;
}

.content-container::-webkit-scrollbar {
  display: none;
} */

@media (max-width: 960px) {
  .toc-container {
    display: none;
  }
}
</style>

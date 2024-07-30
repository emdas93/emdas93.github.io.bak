<template>
	<div class="toc-container text-caption text-disabled" v-html="content"></div>
</template>

<script setup>
import { usePostStore } from '@/store/post';
const props = defineProps({
	content: {
		type: String,
		required: true,
	},
});

const isClient = typeof window !== 'undefined';
const postStore = usePostStore();

if (isClient) {
	const scrollspy = () => {
		if (!postStore.tocElement) {
			postStore.tocElement = document.getElementsByClassName('toc-container')[0];
		}

		const contentElement = document.getElementsByClassName('markdown-body')[0];
		const hElements = contentElement.querySelectorAll('h1, h2, h3');

		let activeElement = null;

		hElements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (rect.top < 70) {
				activeElement = el;
			}
		});

		// 페이지 끝에 도달했는지 확인
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			activeElement = hElements[hElements.length - 1]; // 마지막 헤더 요소를 활성화
		}

		if (activeElement) {
			const id = activeElement.id;
			const tocLinks = postStore.tocElement.querySelectorAll('a');

			tocLinks.forEach((link) => {
				link.classList.remove('text-high-emphasis');
				
				if (link.getAttribute('href') === `#${id}`) {
					link.classList.add('text-high-emphasis');
				}
			});
		}
	};

	document.addEventListener('scroll', scrollspy);
}
</script>

<style>
.toc-container {
	max-height: calc(100vh - 60px);
	overflow-y: auto;
	padding: 20px;
	-ms-overflow-style: none;
}

.toc-container ul,
.toc-container ol {
	padding-left: 2em;
}

.toc-container a {
	color: inherit;
	text-decoration: none;
}
</style>
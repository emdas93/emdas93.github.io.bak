<template>
	<div class="toc-container text-caption text-disabled" v-html="content"></div>
</template>

<script setup>
import { usePostStore } from '@/store/post';
import uslug from "uslug";
const props = defineProps({
	content: {
		type: String,
		required: true,
	},
});

const isClient = typeof window !== 'undefined';
const postStore = usePostStore();

if (isClient) {
	// 초기 로딩 시 해시 값을 확인하여 해당 위치로 스크롤
	const initialHash = window.location.hash;
	
	if (initialHash) {
		const decodedHash = decodeURIComponent(initialHash);
		const targetId = decodedHash.substring(1); // 해시 앞의 '#' 제거 후 ID로 사용

		const scrollToElement = () => {
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				targetElement.scrollIntoView({ behavior: 'smooth' });
				return true;
			}
			return false;
		};

		if (!scrollToElement()) {
			const observer = new MutationObserver((mutations, observerInstance) => {
				if (scrollToElement()) {
					observerInstance.disconnect();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}
	}
	const scrollspy = () => {
		const tocElement = document.getElementsByClassName('toc-container')[0];

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
			const tocLinks = tocElement.querySelectorAll('a');

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
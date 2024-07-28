<template>
	<div ref="utterancesContainer"></div>
</template>

<script>
import { useMainStore } from '@/store/main';

export default {
	name: "Utterances",
	mounted() {
		this.loadUtterances();
	},
	beforeRouteUpdate(to, from, next) {
		this.loadUtterances();
		next();
	},
	methods: {
		loadUtterances() {
			const mainStore = useMainStore();

			// Remove existing utterances container if it exists
			const existingContainer = this.$refs.utterancesContainer.querySelector('.utterances');
			if (existingContainer) {
				existingContainer.remove();
			}

			// Create and append the Utterances script
			const script = document.createElement('script');
			script.src = 'https://utteranc.es/client.js';
			script.async = true;
			script.setAttribute('repo', 'emdas93/emdas93.github.io.comment'); // Replace 'OWNER/REPO' with your repository
			script.setAttribute('issue-term', 'pathname');
			script.setAttribute('theme', mainStore.getIsDarkTheme() ? 'github-dark' : 'github-light');
			script.crossOrigin = 'anonymous';
			this.$refs.utterancesContainer.appendChild(script);
		}
	}
};
</script>
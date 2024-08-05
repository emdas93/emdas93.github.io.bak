<template>
	<v-app>
		<AppHeader />
		<v-main>
			<router-view />
		</v-main>
		<!-- <AppFooter /> -->
	</v-app>
</template>

<script setup>
import { watch, onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';
import { useMainStore } from './store/main';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

const mainStore = useMainStore();
const theme = useTheme();

onMounted(() => {
	// mainStore.setIsDarkTheme(theme.current.value.dark);
})

// 테마가 변경될 때 감지하고 실행되는 훅
watch(() => theme.current.value.dark, (newValue, oldValue) => {
	// mainStore.setIsDarkTheme(newValue);
});


</script>

<style>
@import url('../node_modules/github-markdown-css/github-markdown-light.css');

.no-style-link {
	color: inherit;
	text-decoration: none;
}

.no-style-link:hover {
	color: inherit;
	text-decoration: none;
}

html {
	/* scroll-padding-top: 64px; */
}
</style>
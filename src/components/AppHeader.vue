<template>
	<v-app-bar :elevation="2">
		<template v-slot:prepend>
			<v-app-bar-nav-icon @click="toggleNavigationDrawer()"></v-app-bar-nav-icon>
		</template>
		<v-app-bar-title>
			<router-link to="/" class="no-style-link">
				EMDAS93
			</router-link>
		</v-app-bar-title>
		<v-spacer></v-spacer>
		<v-btn icon @click="toggleDarkTheme()">
			<v-icon>mdi-theme-light-dark</v-icon>
		</v-btn>
		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn icon v-bind="props">
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>
			<v-list>
				<v-list-item link>
					<v-list-item-title>
						<v-icon>mdi-information</v-icon>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>

	<v-navigation-drawer v-model="sidebarOpenState">
		<v-list-item>
			<v-list-item-title>emdas93</v-list-item-title>
			<v-list-item-subtitle>Blog</v-list-item-subtitle>
		</v-list-item>
		<v-divider></v-divider>
		<router-link class="no-style-link" to="/">
			<v-list-item link title="Index"></v-list-item>
		</router-link>
	</v-navigation-drawer>
</template>

<script setup>
	import { ref } from 'vue';
	import { useTheme } from 'vuetify';

	const sidebarOpenState = ref(false);
	const toggleNavigationDrawer = () => {
		sidebarOpenState.value = !sidebarOpenState.value;
	};

	const theme = useTheme();
	const toggleDarkTheme = () => {
		theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
	}

  

</script>
<style>
</style>
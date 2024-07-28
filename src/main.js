/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createSSRApp, createApp as createClientApp } from 'vue'

// Plugins
import router from './router/index.js'
import vuetify from './plugins/vuetify.js'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'

// Main Components
import App from '/src/App.vue'

const isClient = typeof window !== 'undefined'

const createApp = () => {
	const app = isClient
		? createClientApp(App)
		: createSSRApp(App)

	const store = createPinia();
	const head = createHead();

	app.use(vuetify)
		.use(router)
		.use(store)
		.use(head)

	isClient ? app.mount('#app') : ''

	return { app, router, head };
}
export { createApp }
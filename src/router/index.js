
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router/auto'
// import { routes } from 'vue-router/auto-routes'

import index from '@/pages/index.vue'
import post from '@/pages/post/[slug].vue';

// Auto Route 안 쓸 경우 아래와 같이 수동으로 지정해주자.
// 정적 사이트에서 Auto Route를 쓰면 동적으로 임포트 하기 실패했다고 뜬다... 

const routes = [
	{ path: '/', component: index },
	{ name: 'post', path: '/post/:slug', component: post }
];

const isClient = typeof window !== 'undefined'

const router = createRouter({
	history: isClient
		? createWebHistory(import.meta.env.BASE_URL)
		: createMemoryHistory(import.meta.env.BASE_URL),
	routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

// router.isReady().then(() => {
//   localStorage.removeItem('vuetify:dynamic-reload')
// })

export default router

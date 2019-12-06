import Layout from '@/pages/layout'
const routes = [{
	path: '/',
	component: Layout,
	redirect: '/',
	children: [{
		path: '/',
		name: 'name',
		component: () => import(/* webpackChunkName: "test-chunk" */ '@/pages/home/index.vue')
	}, {
		path: '/detail',
		name: 'detail',
		component: () => import(/* webpackChunkName: "test-chunk" */ '@/pages/detail/index.vue')
	}, {
		path: '/list',
		name: 'list',
		component: () => import(/* webpackChunkName: "test-chunk" */ '@/pages/list/index.vue')
	}, {
		path: '/poster',
		name: 'poster',
		component: () => import(/* webpackChunkName: "test-chunk" */ '@/pages/poster/index.vue')
	}, {
		path: '/about',
		name: 'about',
		// component: () => import(/* webpackPrefetch: false */ '@/pages/about/index.vue')
		component: () => import(/* webpackChunkName: "test-about" */ '@/pages/about/index.vue')
	}]
}, {
	path: '*',
	redirect: '/'
}]

export default routes
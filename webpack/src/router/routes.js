
const routes = [{
	path: '/',
	name: 'name',
	component: () => import(/* webpackChunkName: "test-preview" */ '@/pages/home/index.vue')
}, {
	path: '/detail',
	name: 'detail',
	component: () => import(/* webpackChunkName: "test-preview" */ '@/pages/detail/index.vue')
}, {
	path: '/list',
	name: 'list',
	component: () => import(/* webpackChunkName: "test-list" */ '@/pages/list/index.vue')
}, {
	path: '/poster',
	name: 'poster',
	component: () => import(/* webpackChunkName: "test-list" */ '@/pages/poster/index.vue')
}]

export default routes
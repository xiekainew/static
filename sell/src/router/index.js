import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/goods';
import Seller from '@/components/seller/seller';
import Ratings from 'components/ratings/ratings';
import Home from '../home';
import App from '../App';
import Nav from '../nav';
import Wuziqi from '@/components/wuziqi/wuziqi';
import Index from '@/components/index';
import Package from '@/components/package/package';
import One from '@/components/h5/one';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/',
                    name: 'Nav',
                    component: Nav
                }, {
                    path: '/wuziqi',
                    name: 'Wuziqi',
                    component: Wuziqi
                }, {
                    path: '/xn',
                    name: 'Index',
                    component: Index
                }, {
                    path: '/package',
                    name: 'package',
                    component: Package
                }, {
                    path: '/one',
                    name: 'one',
                    component: One
                }
            ]
        }, {
            path: '/',
            name: 'App',
            component: App,
            children: [
                {
                    path: '/Goods',
                    name: 'Goods',
                    component: Goods
                }, {
                    path: '/seller',
                    name: 'Seller',
                    component: Seller
                }, {
                    path: '/ratings',
                    name: 'Ratings',
                    component: Ratings
                }
            ]
        }
    ]
});

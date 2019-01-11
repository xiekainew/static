// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import App from './App';
import Home from './home';
import router from './router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import './common/style/base.scss';
import './common/style/style.css';
import './assets/style/reset.css';
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<Home/>',
    components: {Home},
    data: {
        eventHub: new Vue()
    }
});

// router.go('/goods');
// 路由基础用法
// import VueRouter from 'vue-router';
// import goods from './components/goods/goods';
//
// Vue.use(VueRouter);
//
// let app = Vue.extend(App);
// let router = new VueRouter();
//
// router.map({
//     '/goods': {
//         component: goods
//     }
// });
//
// router.start(app, `#app`);

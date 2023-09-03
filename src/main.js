// Main library files import
import Vue, { createApp } from '@vue/compat';
import { createRouter, createWebHistory } from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue'

// CSS files import
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.prototype.$MIN_NUMBERS = 1;
Vue.prototype.$MAX_NUMBERS = 40;

import { func } from '../src/func.js'

// global app vars
Vue.prototype.$func = func

import moment from 'moment';
Vue.prototype.moment = moment

// Router settings
const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import("./views/HomeView.vue"),
        meta: { transition: 'fade' },
    }
];


// Load the router
const router = new createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

// Change title name of web page after loading the page
// router.beforeEach((to, from, next) => {
//     document.title = to.name + ' | ' + import.meta.env.VITE_SITE_NAME;
//     next();
// });

export default router;

Vue.mixin({
    data: function () {
        return {
            globalVar: 'global'
        }
    }
})

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

const app = createApp(App);
app.use(router);

// Start an application
router.isReady().then(() => app.mount('#app'));

// Main library files import
import Vue, { createApp } from '@vue/compat';
import { createRouter, createWebHistory } from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue'

// CSS files import
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import {func} from '../src/func.js'
import User from './provider/User.js'

// global app vars
Vue.prototype.$balance = 1000
Vue.prototype.$costs = 0
Vue.prototype.$func  = func
Vue.prototype.$user = (new User(10000))

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
router.beforeEach((to, from, next) => {
    document.title = to.name + ' | ' + import.meta.env.VITE_SITE_NAME;
    next();
});

export default router;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

const app = createApp(App);
app.use(router);

// Start an application
router.isReady().then(() => app.mount('#app'));

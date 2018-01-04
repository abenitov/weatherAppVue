import Vue from 'vue';
import VueRouter from 'vue-router';

import customCom from './components/container.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/first/:message', component: {
            template: '<span>hola {{$route.params.message}}</span>'
        }
    },
    {
        path: '/second', component: customCom
    },
    {
        path: '/third/:name', component: customCom
    }
];



const router = new VueRouter({
    routes
});

module.exports = router;


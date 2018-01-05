import Vue from 'vue';
import VueRouter from 'vue-router';

import weatherDashboard from '../components/weather-dashboard.vue';
import weatherDetails from '../components/weather-details.vue';
import weatherRecords from '../components/weather-records.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/', component: weatherDashboard
    },
    {
        path: '/currentTemp', component: weatherDetails
    },
    {
        path: '/history', component: weatherRecords
    }
];



const router = new VueRouter({
    routes
});

module.exports = router;


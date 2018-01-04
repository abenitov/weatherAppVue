import Vue from 'vue';
import VueResource from 'vue-resource';
import container from './components/container.vue';
import weatherDashboard from './components/weather-dashboard.vue';
import weatherDetails from './components/weather-details.vue';
import weatherRecords from './components/weather-records.vue';
import router from './config/router';
import i18n from './config/i18n';
import WeatherService from './services/weatherService';


import  '../public/style/app.scss';

Vue.use(VueResource);
Vue.component('app-container', container);
Vue.component('weather-dashboard', weatherDashboard);
Vue.component('weather-details', weatherDetails);
Vue.component('weather-records', weatherRecords);

new WeatherService();

new Vue({
    el: '#app',
    router: router,
    i18n: i18n,
    data:{
        message:"hola"
    }
});
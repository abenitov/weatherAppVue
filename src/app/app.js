import Vue from 'vue';
import customCom from './components/customCom.vue';
import router from './router';

Vue.component('custom-comp', customCom);


new Vue({
    el: '#app',
    router: router,
    data:{
        message:"hola"
    }
});
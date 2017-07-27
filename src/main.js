

import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'


// var Vue = require('vue');
// var VueFire = require('');


Vue.use(VueFire);


new Vue({
    el: '#app',
    render: h => h(App)
});



// var vm = new Vue({
//     el: '#demo',
//     data: {
//         message: 'hello'
//     },
//     firebase: {
//         // simple syntax, bind as an array by default
//         anArray: db.ref('to-do')
//     }
// });
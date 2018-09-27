// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//
// Vue.config.productionTip = false;

// import './assets/sass/app.scss';
import './bootstrap';

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })


//
new Vue(App).$mount('#app');

// import { router } from './bootstrap';

// new Vue({
// 	router,
// 	render: h => h(App)
// }).$mount('#app');

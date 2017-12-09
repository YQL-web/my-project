// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

export default {
  init(app, routes = []) {
    const router = new VueRouter({
      hashbang: false,
      history: true,
      routes
    })

    return new Vue({
      router,
      render: h => h(app)
    }).$mount('#app')
  }
}

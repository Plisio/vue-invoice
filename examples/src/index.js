import Vue from 'vue'
import DemoApp from './DemoApp.vue'

Vue.config.productionTip = false

export const app = new Vue({
  render: h => h(DemoApp)
}).$mount('#app')

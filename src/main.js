import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Axios from '@/../axios_settings'
Vue.config.productionTip = false
new Vue({
  vuetify,
  render: h => h(App),

}).$mount('#app')
Vue.prototype.$http = Axios
export const eventBus = new Vue()
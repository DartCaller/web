import '!style-loader!css-loader!sass-loader!../assets/scss/main.scss';

import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import ICountUp from 'vue-countup-v2'

import Socket from '../plugins/socket'

Socket({ store: {}}, (name, plugin) => {
  Vue.use({ install: (VueInstance) => {
      VueInstance.prototype['$'+name] = plugin
  }})
})

Vue.use({ install: (VueInstance) => {
  VueInstance.prototype.$store = { state: {}, commit: () => ({}) }
}})

Vue.component('CountUp', ICountUp)
Vue.component('NuxtLink', {
  props:  {
    to: {
      type: String,
      required: true
    }
  },
  template: '<a :href="to"><slot /></a>'
})
Vue.use(Vuesax, {})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#fff' },
      { name: 'gray', value: '#303030' },
    ],
  },
}

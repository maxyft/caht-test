import Vue from 'vue'
import Entry from 'components/messenger/index.vue'

import store from './store'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner, faPaperPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import MessengerStoreEntry from 'store-modules/messenger/messenger.entry'

MessengerStoreEntry(store)

const vue = new Vue({
  el: '#app',
  render: h => h(Entry),
  router,
  store
})
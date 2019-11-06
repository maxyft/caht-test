import { Store } from 'vuex'

import MESSENGER from './messenger.name'
import { messengerStore } from './messenger.store'

export default (store: Store<any>): void => {
  store.registerModule(MESSENGER, messengerStore, {
    preserveState: !!store.state.MESSENGER
  })
}

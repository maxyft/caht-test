import Vue from 'vue'

import MESSENGER_STORE from 'store-modules/messenger/messenger.name'

import { Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import MessageCounter from 'components/messenger/ui/message-counter/message-counter.vue'
import ChatList from 'components/messenger/ui/chat-list/chat-list.vue'

import {
  IMessengerChat
} from 'store-modules/messenger/types/messenger.types'

@Component({
  components: {
    MessageCounter,
    ChatList
  }
})
export default class MessengerComponent extends Vue {
  @Getter(`${MESSENGER_STORE}/chats`)
  chats: IMessengerChat[]
  @Getter(`${MESSENGER_STORE}/messageCount`)
  messageCount: number

  @Action(`${MESSENGER_STORE}/selectChat`)
  selectChat!: any

  get currentChat(): number {
    return Number(this.$route.params.id) || null
  }

  onSelectChat(id: number) {
    this.selectChat()
    this.$router.push(`/chat/${id}`).catch(err => { })
  }
}
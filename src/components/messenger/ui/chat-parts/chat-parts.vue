<template>
  <div class="chat-parts-container">
    <transition name=fade>
      <div class="chat-parts-pending" v-if="isAppPending">
        <div class="chat-parts-pending__flex">
          <p class="chat-parts-pending__pending-text">Loading Chat</p>
          <font-awesome-icon icon="spinner" spin/>
        </div>
      </div>
    </transition>
    <div class="chat-parts" ref="partsCont">
      <div class="chat-parts__wrapper">
        <chat-part
          v-for="part in currentChat.parts"
          :key="part.id"
          :chatPart="part"
          :user="user"
        />
      </div>
    </div>
    <div class="chat-input-component">
      <chat-input
        :isPending="isChatPending"
        @add-part="onAddPart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import MESSENGER_STORE from 'store-modules/messenger/messenger.name'

import ChatPart from 'components/messenger/ui/chat-parts/chat-part.vue'
import ChatInput from 'components/messenger/ui/chat-parts/chat-input.vue'

import {
  IMessengerChat
} from 'store-modules/messenger/types/messenger.types'

@Component({
  components: {
    ChatPart,
    ChatInput
  }
})
export default class ChatParts extends Vue {
  @Getter(`${MESSENGER_STORE}/chats`)
  chats: IMessengerChat[]
  @Getter(`${MESSENGER_STORE}/user`)
  user: IMessengerChat[]
  @Getter(`${MESSENGER_STORE}/isAppPending`)
  isAppPending: boolean

  @Action(`${MESSENGER_STORE}/addPartToChat`)
  addPartToChat: any

  @Watch('partsLn')
  onPartsChange(val: number) {
    this.$nextTick(() => {
      const container = this.$refs.partsCont as HTMLElement
      const scroll = container.scrollHeight - container.clientHeight
      container.scrollTo({ top: scroll })
    })
  }

  get chatId(): number {
    return Number(this.$route.params['id'])
  }

  get currentChat(): IMessengerChat {
    return this.chats.find(chat => chat.id === this.chatId)
  }

  get isChatPending(): boolean {
    return this.currentChat.isPending
  }

  get partsLn(): number {
    return this.currentChat.parts.length
  }

  onAddPart(text: string) {
    this.addPartToChat({ chatId: this.chatId, text })
  }
}
</script>

<style lang="scss">
  @import './style.scss';
</style>
<template>
  <div
    class="chat-item"
    :class="{ 'chat-item--active': isChatActive }"
    @click="selectChat"
  >
    <div class="chat-item__wrapper">
      <div class="chat-item__title">
        <div class="chat-item__subject">
          {{ chatItem.subject }}
        </div>
        <div class="chat-item__date">
          {{ chatCreated }}
        </div>
      </div>
      <div class="chat-item__text">
        {{ firstChatPart }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { IMessengerChat } from 'store-modules/messenger/types/messenger.types'
import * as moment from 'moment'

@Component({})
export default class ChatItem extends Vue {
  @Prop(Object)
  chatItem: IMessengerChat
  @Prop(Number)
  currentChat!: number

  get firstChatPart(): string {
    return this.chatItem.parts[0].text
  }

  get chatCreated(): string {
    return moment(this.chatItem.created).format('D MMMM YYYY')
  }

  get isChatActive(): boolean {
    return this.chatItem.id === this.currentChat
  }

  selectChat() {
    if (this.currentChat !== this.chatItem.id) {
      this.$emit('select-chat', this.chatItem.id)
    }
  }
}
</script>
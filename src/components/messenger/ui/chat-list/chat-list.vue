<template>
  <div class="chat-list">
    <chat-item
      v-for="chat in chats"
      :chatItem="chat"
      :currentChat="currentChat"
      :key="chat.id"
      @select-chat="(id) => $emit('select-chat', id)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import {
  IMessengerChat
} from 'store-modules/messenger/types/messenger.types'

import ChatItem from './chat-item.vue'

@Component({
  components: {
    ChatItem
  }
})
export default class ChatList extends Vue {
  @Prop(Array)
  chats!: IMessengerChat[]
  @Prop(Number)
  currentChat!: number
}
</script>

<style lang="scss">
  @import './style.scss';
</style>
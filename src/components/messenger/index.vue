<template>
  <div class="messenger-app">
    <div class="messenger-component">
      <div class="chat-list-component">
        <message-counter :messageCount="messageCount" />
        <chat-list
          :chats="chats"
          :currentChat="currentChat"
          @select-chat="onSelectChat"
        />
      </div>
      <div class="chat-parts-component">
        <div v-if="currentChat === null">
          Select a chat to start messaging
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MessengerComponent from 'components/messenger/index'
export default class MessengerTemplate extends MessengerComponent {}
</script>

<style lang="scss">
 @import '/style.scss';
</style>
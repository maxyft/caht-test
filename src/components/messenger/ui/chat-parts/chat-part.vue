<template>
  <div
    class="chat-part"
    :class="{ 'chat-part--yours': isPartFromCurrentUser }"
  >
    <div class="chat-part__wrapper">
      <div class="chat-part__text">
        {{ chatPart.text }}
      </div>
    </div>
    <div class="chat-part__info">
      <div class="chat-part__author"> {{ chatPart.author }} </div>
      <div class="chat-part__date"> {{ partDate }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import * as moment from 'moment'

import {
  IMessengerChatPart
} from 'store-modules/messenger/types/messenger.types'

@Component({})
export default class ChatPart extends Vue {
 @Prop(Object)
 chatPart!: IMessengerChatPart
 @Prop(String)
 user!: string

 get isPartFromCurrentUser(): boolean {
   return this.chatPart.author === this.user
 }

 get partDate(): string {
   return moment(this.chatPart.created) .format('DD.MM.YYYY HH:mm')
 }
}
</script>
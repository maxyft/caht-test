<template>
  <div class="chat-input">
    <transition name="fade">
      <div class="chat-input__pending" v-if="isPending">
        <font-awesome-icon icon="spinner" spin />
      </div>
    </transition>
    <div class="chat-input__text-field">
      <textarea
        class="chat-input__text-area"
        cols="30"
        rows="10"
        placeholder="Введите текст..."
        v-model="text"
      ></textarea>
    </div>
    <div class="chat-input__enter-button" @click="addPart">
      <font-awesome-icon icon="paper-plane"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ChatInput extends Vue {
  @Prop(Boolean)
  isPending!: boolean

  text: string = ''

  addPart(): void {
    if (!this.text) return

    this.$emit('add-part', this.text)
    this.text = ''
  }
}
</script>
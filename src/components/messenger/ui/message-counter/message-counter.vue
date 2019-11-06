<template>
  <div class="message-counter">
    <div class="message-counter__wrapper">
      <p class="message-counter__title"> Сообщения </p>
      <p class="message-counter__count"> {{ messageCount }} </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class MessageCounter extends Vue {
  @Prop(Number)
  messageCount!: number
}
</script>

<style lang="scss" scoped>
  @import '/style.scss';
</style>
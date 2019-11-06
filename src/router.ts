import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import ChatParts from 'components/messenger/ui/chat-parts/chat-parts.vue'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/chat/:id',
    component: ChatParts
  }
]

export default new Router({ routes })

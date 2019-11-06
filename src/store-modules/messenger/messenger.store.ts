import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree
} from 'vuex'

const ADD_PART = 'ADD_PART'
const SET_CHAT_PENDING = 'SET_CHAT_PENDING'
const SET_APP_PENDING = 'SET_APP_PENDING'

import * as moment from 'moment'

import {
  IMessengerState,
  IMessengerChat,
  IMessengerChatPart
} from './types/messenger.types'

const namespaced: boolean = true

const state: IMessengerState = {
  user: 'userName',
  isPending: false,
  chats: [
    {
      id: 1,
      subject: 'Простой запрос',
      created: '2019-08-01 23:59',
      isPending: false,
      parts: [
        {
          id: 1,
          author: 'userName',
          text: 'Привет, как дела?',
          created: '2019-08-01 23:59',
        },
        {
          id: 2,
          author: 'petya',
          created: '2019-08-02 01:20',
          text: 'Привет, все хорошо, спасибо!',
        },
        {
          id: 3,
          author: 'petya',
          created: '2019-08-02 05:20',
          text: 'А у тебя?',
        },
      ],
    },
    {
      id: 2,
      subject: 'Вопрос по домену',
      created: '2016-03-02 14:19',
      isPending: false,
      parts: [
        {
          id: 1,
          author: 'petr',
          created: '2019-08-06 12:20',
          text: 'Здравствуйте, тут есть кто-нибудь?',
        },
        {
          id: 2,
          author: 'userName',
          created: '2019-08-06 12:34',
          text: 'Да, я вас слушаю!',
        },
        {
          id: 3,
          author: 'petr',
          created: '2019-08-06 12:38',
          text: 'Помогите мне настроить домен!',
        },
      ],
    },
  ]
}

const getters: GetterTree<IMessengerState, null> = {
  chats: (state: IMessengerState) => state.chats,
  messageCount: (state: IMessengerState) => state.chats.map(chat => chat.parts.length).reduce((acc, currentCount) => acc += currentCount),
  user: (state: IMessengerState) => state.user,
  isAppPending: (state: IMessengerState) => state.isPending
}

const actions: ActionTree<IMessengerState, null> = {
  async selectChat({ commit }) {
    commit(SET_APP_PENDING)
    setTimeout(() => {
      commit(SET_APP_PENDING)
    }, 1000)
  },
  addPartToChat({ commit }, { chatId, text }: { chatId: string; text: string }) {
    commit(SET_CHAT_PENDING, { chatId, status: true })

    setTimeout(() => {
      commit(ADD_PART, { chatId, text })
      commit(SET_CHAT_PENDING, { chatId, status: false })
    }, 1000)
  }
}

const mutations: MutationTree<IMessengerState> = {
  [ADD_PART](state, { chatId, text }) {
    const chat: IMessengerChat = state.chats.find(chat => chat.id === chatId)
    const partsLn = chat.parts.length
    const lastPartId = chat.parts[partsLn - 1].id + 1
    const part: IMessengerChatPart = {
      id: lastPartId,
      author: state.user,
      text,
      created: moment().format('YYYY-MM-DD HH:mm')
    }

    chat.parts.push(part)
  },
  [SET_CHAT_PENDING](state, { chatId, status }) {
    const chat: IMessengerChat = state.chats.find(chat => chat.id === chatId)
    chat.isPending = status
  },
  [SET_APP_PENDING](state) {
    state.isPending = !state.isPending
  }
}

export const messengerStore: Module<IMessengerState, null> = {
  actions,
  getters,
  mutations,
  namespaced,
  state
}

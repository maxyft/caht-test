interface IMessengerState {
  user: string
  isPending: boolean
  chats: IMessengerChat[]
}

interface IMessengerChat {
  id: number
  subject: string
  created: string,
  parts: IMessengerChatPart[]
  isPending: boolean
}

interface IMessengerChatPart {
  id: number
  author: string
  text: string
  created: string
}


export {
  IMessengerState,
  IMessengerChat,
  IMessengerChatPart
}
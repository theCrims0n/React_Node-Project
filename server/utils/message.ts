const createMessage = (name: string, message: string, me: string, messages: [], chats: []) => {

    return {
        name, message, date: new Date().getTime(), me: me, messages: messages, chats: chats
    }
}

export default createMessage
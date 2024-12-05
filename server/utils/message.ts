const createMessage = (name: string, message: string, me: string) => {

    return {
        name, message, date: new Date().getTime(), me: me
    }
}

export default createMessage
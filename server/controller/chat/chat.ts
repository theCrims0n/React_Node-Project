import { UsersChat } from "../../interfaces/users/usersChat";

class Chat {

    private users: UsersChat[];

    constructor() {

        this.users = []

    }

    addUsers(id: string, email: string, name: string, lastname: string) {

        const user = { id, email, name, lastname }

        this.users.push(user)

        return this.users;

    }

    getUsers() {
        return this.users
    }

    findUser(id: string) {

        const user = this.users.filter((user) => { return user.id == id })[0]

        if (!user) {
            return []
        }

        return user
    }

    deleteUser(id: string) {
        const deleteUser = this.findUser(id)
        this.users = this.users.filter(user => user.id != id)
        return deleteUser
    }

    getUsersByChatRoom(room_id: number) {

    }

}

export default Chat
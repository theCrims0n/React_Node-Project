import db from "../../db/connection";
import { UsersChat } from "../../interfaces/users/usersChat";
import chatsSchema from "../../schema/chats/chats.";
import chats_detSchema from "../../schema/chats_det/chats-det";

class Chat {

    private users: UsersChat[];

    constructor() {

        this.users = []

    }

    addUsers(id: string, email: string, name: string, lastname: string, user_id: number) {

        const user = { id, email, name, lastname, user_id }

        this.users.push(user)

        return this.users;

    }

    getUsers() {
        return this.users
    }


    async saveMessage(data: any) {
        const { message, to_id, from_id, chat_id: id } = data

        const existChat : any = await chatsSchema.findByPk(id)
        console.log(existChat)

        if (!existChat) {
            const chat = await chatsSchema.create({ from_id, to_id })

            if (chat) {
                const { id: chats_id } = chat.dataValues
                const users_id = from_id
                chats_detSchema.create({ chats_id, message, users_id })
                return chats_id
            }
        }
        const { id: chats_id } = existChat.dataValues
        const users_id = from_id
        chats_detSchema.create({ chats_id, message, users_id })
        return chats_id
    }

    findUser(id: string) {

        const user = this.users.filter((user) => { return user.id == id })[0]

        if (!user) {
            return []
        }

        return user
    }

    async setMessage(from: string, to: string) {

        const to_id = this.users.filter(f => f.id == to)[0]?.user_id
        const from_id = this.users.filter(f => f.id == from)[0]?.user_id
        const chat = await chatsSchema.findAll({ where: { from_id, to_id } })

        return chat
    }

    async setAllMessages(id: number) {

        const [chats] = await db.query(`
                select from_id, to_id, message, chats_dets.users_id,
                chats_dets."createdAt" as date, chats.id as chat_id
                from chats 
                inner join chats_dets on chats_dets.chats_id = chats.id 
                where chats.id = ${id}`)

        return { chats }
    }

    async setLastMessages(id: string) {
        const user_id = this.users.filter(f => f.id == id)[0]?.user_id
        if (user_id) {
            const [chats] = await db.query(`SELECT *
                FROM (
                SELECT chats.id, chats_dets.message, chats.from_id, chats.to_id, 
                users.name, users.lastname, ROW_NUMBER() 
                OVER (PARTITION BY chats.id ORDER BY chats_dets.id desc) AS row_num
                FROM chats
                INNER JOIN chats_dets ON chats_dets.chats_id = chats.id
                inner join users on users.id = (case when chats.from_id = ${user_id} then chats.to_id else chats.from_id end) 
                where chats.from_id = ${user_id} or chats.to_id = ${user_id}
                order by chats_dets.id desc
                ) AS subquery
                WHERE row_num = 1`)
            return { chats }
        }

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
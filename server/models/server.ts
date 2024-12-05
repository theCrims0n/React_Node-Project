import express, { Application } from 'express'
import cors from 'cors'
import db from '../db/connection';
import userRoutes from '../routes/users/users'
import authRoutes from '../routes/auth/auth'
import chatRoutes from '../routes/chat/chat'
import cookieParser from 'cookie-parser'
import { Server as SocketServer, Socket } from 'socket.io'
import { createServer } from 'node:http';
import { Users } from '../interfaces/users/users';
import Chat from '../controller/chat/chat';
import createMessage from '../utils/message';

class Server {

    private app: Application;
    private port: string;
    private apiAuth: string
    private apiPathUser: string
    private apiPathChat: string
    private io: any;
    private server: any;

    constructor() {
        this.apiAuth = '/api/auth';
        this.apiPathUser = '/api/users';
        this.apiPathChat = '/api/chat';
        this.app = express();
        this.port = process.env.PORT || '3001'
        this.server = createServer(this.app)
        this.io = new SocketServer(this.server, { cors: { origin: 'http://localhost:3000' }, connectionStateRecovery: {} })
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.sockets();
    }

    async dbConnection() {
        await db.authenticate().then(() => {
            console.log('DB is running correctly')
        }).catch((err) => {
            console.log(err)
        });
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors({
            credentials: true,
            origin: 'https://react-node-project-1-my5f.onrender.com' 
            //origin: 'http://localhost:3000'
        }))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use(cookieParser())
    }

    routes() {
        this.app.use(this.apiAuth, authRoutes)
        this.app.use(this.apiPathUser, userRoutes)
        this.app.use(this.apiPathChat, chatRoutes)

    }

    sockets() {

        const usersChat = new Chat();

        this.io.on('connection', (socket: Socket) => {

            console.log('An user has connected')

            socket.on('enterChat', (user: any) => {
                if (!user.email) {
                    return
                }
                usersChat.addUsers(socket.id, user.email, user.name, user.lastname)
            })

            socket.on('createMessage', (data) => {
                const { name, message: oldMessage } = data
                const message = createMessage(name, oldMessage, '')
                socket.broadcast.emit('createMessage', message)
            })

            socket.on('privateMessage', (data: any) => {
                const user: any = usersChat.findUser(socket.id)
                const { name } = user
                const { message, to, from } = data
                const me = from
                this.io.to(to).to(socket.id).emit('privateMessage', createMessage(name, message, me))
            })

            socket.on('getUsersConnected', () => {
                const result = usersChat.getUsers()
                console.log(result)
                this.io.emit('getUsersConnected', result)
            })

            socket.on('disconnect', () => {
                const user: any = usersChat.deleteUser(socket.id)
                const { name } = user
                console.log(`An user has disconnected ${name}`)
            })

            socket.on('chat message', (message: string) => {
                this.io.emit('chat message', message)
                console.log(message)
            })
        })
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server is running on port ' + this.port)
        })
    }
}

export default Server
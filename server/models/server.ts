import express, { Application } from 'express'
import cors from 'cors'
import db from '../db/connection';
import userRoutes from '../routes/users/users'
import authRoutes from '../routes/auth/auth'
import cookieParser from 'cookie-parser'

class Server {

    private app: Application;
    private port: string;
    private apiAuth: string
    private apiPathUser: string

    constructor() {
        this.apiAuth = '/api/auth';
        this.apiPathUser = '/api/users';
        this.app = express();
        this.port = process.env.PORT || '3001'
        this.dbConnection();
        this.middlewares();
        this.routes();
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
        this.app.use(cors({ credentials: true, origin: 'https://react-node-project-1-my5f.onrender.com' }))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use(cookieParser())
    }

    routes() {
        this.app.use(this.apiAuth, authRoutes)
        this.app.use(this.apiPathUser, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port ' + this.port)
        })
    }
}

export default Server
import { Sequelize } from 'sequelize'

const host = process.env.NODE_ENV == 'production' ? process.env.AWS_LINK : 'localhost'
const port = process.env.NODE_ENV == 'production' ? process.env.AWS_PORT : 8080
const key = process.env.NODE_ENV == 'production' ? process.env.AWS_SECRET_KEY! : 'root32'

const db = new Sequelize('nextia', 'postgres', key, {
    host: host,
    port: Number(port),
    dialect: 'postgres'
})

export default db;
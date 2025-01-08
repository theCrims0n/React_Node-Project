import { Sequelize } from 'sequelize'
require('dotenv').config();

const { RDS_NAME, RDS_USERNAME, RDS_PASSWORD, RDS_HOST,
    RDS_PORT, LOCAL_PORT, LOCAL_HOST, LOCAL_PASSWORD, LOCAL_NAME,
    LOCAL_USERNAME, NODE_ENV = 'production' } = process.env

const host = RDS_HOST
const port = RDS_PORT
const password = RDS_PASSWORD
const username = RDS_USERNAME
const bdname = RDS_NAME

const db = new Sequelize(bdname!, username!, password!, {
    host: host!,
    port: Number(port!),
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: { rejectUnauthorized: false, require: true },
    }
})

export default db;
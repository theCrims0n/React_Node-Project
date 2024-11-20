import { Sequelize } from 'sequelize'

const db = new Sequelize('nextia', 'postgres', 'root32', {
    host: 'localhost',
    port: 8080,
    dialect: 'postgres'
})

export default db;
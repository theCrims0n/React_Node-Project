import { Sequelize } from 'sequelize'

const awshost = 'aws-server-instance-1.cjqsk28esgj3.us-east-2.rds.amazonaws.com'
const awsport = 5432
const awskey = 'Michelle2019'

const localhost = 'localhost'
const localport = 8080
const localkey = 'root32'

const db = new Sequelize('nextia', 'postgres', awskey, {
    host: awshost,
    port: awsport,
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
        ssl: { rejectUnauthorized: false },
    },
})

export default db;
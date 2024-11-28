"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
const { RDS_NAME, RDS_USERNAME, RDS_PASSWORD, RDS_HOST, RDS_PORT, LOCAL_PORT, LOCAL_HOST, LOCAL_PASSWORD, LOCAL_NAME, LOCAL_USERNAME, NODE_ENV = 'production' } = process.env;
const host = NODE_ENV == 'production' ? RDS_HOST : LOCAL_HOST;
const port = NODE_ENV == 'production' ? RDS_PORT : LOCAL_PORT;
const password = NODE_ENV == 'production' ? RDS_PASSWORD : LOCAL_PASSWORD;
const username = NODE_ENV == 'production' ? RDS_USERNAME : LOCAL_USERNAME;
const bdname = NODE_ENV == 'production' ? RDS_NAME : LOCAL_NAME;
const db = new sequelize_1.Sequelize(bdname, username, password, {
    host: host,
    port: Number(port),
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: { rejectUnauthorized: false, require: true },
        sslrootcert: 'rds-ca-rsa2048-g1'
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map
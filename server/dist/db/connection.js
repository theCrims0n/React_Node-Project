"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const host = process.env.NODE_ENV == 'production' ? process.env.AWS_LINK : 'localhost';
const port = process.env.NODE_ENV == 'production' ? process.env.AWS_PORT : 8080;
const key = process.env.NODE_ENV == 'production' ? process.env.AWS_SECRET_KEY_ : 'root32';
const db = new sequelize_1.Sequelize('nextia', 'postgres', key, {
    host: host,
    port: Number(port),
    dialect: 'postgres'
});
exports.default = db;
//# sourceMappingURL=connection.js.map
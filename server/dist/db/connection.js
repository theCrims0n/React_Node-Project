"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('nextia', 'postgres', 'root32', {
    host: 'localhost',
    port: 8080,
    dialect: 'postgres'
});
exports.default = db;
//# sourceMappingURL=connection.js.map
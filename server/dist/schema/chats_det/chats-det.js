"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const chats_detSchema = connection_1.default.define('chats_dets', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chats_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    },
    users_id: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = chats_detSchema;
//# sourceMappingURL=chats-det.js.map
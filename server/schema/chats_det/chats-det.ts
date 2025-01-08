import { DataTypes } from "sequelize";
import db from "../../db/connection";

const chats_detSchema = db.define('chats_dets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chats_id: {
        type: DataTypes.INTEGER,
    },
    message: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    users_id: {
        type: DataTypes.INTEGER
    }
});

export default chats_detSchema
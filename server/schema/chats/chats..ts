import { DataTypes } from "sequelize";
import db from "../../db/connection";

const chatsSchema = db.define('chats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    from_id: {
        type: DataTypes.INTEGER
    },
    to_id: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
});

export default chatsSchema
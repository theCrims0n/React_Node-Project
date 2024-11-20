import { DataTypes } from "sequelize";
import db from "../../db/connection";

const usersSchema = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT
    },
    lastname: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    },
    department: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }

});

export default usersSchema
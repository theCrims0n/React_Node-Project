"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../db/connection"));
const chats_1 = __importDefault(require("../../schema/chats/chats."));
const chats_det_1 = __importDefault(require("../../schema/chats_det/chats-det"));
class Chat {
    constructor() {
        this.users = [];
    }
    addUsers(id, email, name, lastname, user_id) {
        const user = { id, email, name, lastname, user_id };
        this.users.push(user);
        return this.users;
    }
    getUsers() {
        return this.users;
    }
    saveMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message, to_id, from_id, chat_id: id } = data;
            const existChat = yield chats_1.default.findByPk(id);
            console.log(existChat);
            if (!existChat) {
                const chat = yield chats_1.default.create({ from_id, to_id });
                if (chat) {
                    const { id: chats_id } = chat.dataValues;
                    const users_id = from_id;
                    chats_det_1.default.create({ chats_id, message, users_id });
                    return chats_id;
                }
            }
            const { id: chats_id } = existChat.dataValues;
            const users_id = from_id;
            chats_det_1.default.create({ chats_id, message, users_id });
            return chats_id;
        });
    }
    findUser(id) {
        const user = this.users.filter((user) => { return user.id == id; })[0];
        if (!user) {
            return [];
        }
        return user;
    }
    setMessage(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const to_id = (_a = this.users.filter(f => f.id == to)[0]) === null || _a === void 0 ? void 0 : _a.user_id;
            const from_id = (_b = this.users.filter(f => f.id == from)[0]) === null || _b === void 0 ? void 0 : _b.user_id;
            const chat = yield chats_1.default.findAll({ where: { from_id, to_id } });
            return chat;
        });
    }
    setAllMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [chats] = yield connection_1.default.query(`
                select from_id, to_id, message, chats_dets.users_id,
                chats_dets."createdAt" as date, chats.id as chat_id
                from chats 
                inner join chats_dets on chats_dets.chats_id = chats.id 
                where chats.id = ${id}`);
            return { chats };
        });
    }
    setLastMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user_id = (_a = this.users.filter(f => f.id == id)[0]) === null || _a === void 0 ? void 0 : _a.user_id;
            if (user_id) {
                const [chats] = yield connection_1.default.query(`SELECT *
                FROM (
                SELECT chats.id, chats_dets.message, chats.from_id, chats.to_id, 
                users.name, users.lastname, ROW_NUMBER() 
                OVER (PARTITION BY chats.id ORDER BY chats_dets.id desc) AS row_num
                FROM chats
                INNER JOIN chats_dets ON chats_dets.chats_id = chats.id
                inner join users on users.id = (case when chats.from_id = ${user_id} then chats.to_id else chats.from_id end) 
                where chats.from_id = ${user_id} or chats.to_id = ${user_id}
                order by chats_dets.id desc
                ) AS subquery
                WHERE row_num = 1`);
                return { chats };
            }
        });
    }
    deleteUser(id) {
        const deleteUser = this.findUser(id);
        this.users = this.users.filter(user => user.id != id);
        return deleteUser;
    }
    getUsersByChatRoom(room_id) {
    }
}
exports.default = Chat;
//# sourceMappingURL=chat.js.map
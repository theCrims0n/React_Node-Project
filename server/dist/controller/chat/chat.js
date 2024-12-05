"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chat {
    constructor() {
        this.users = [];
    }
    addUsers(id, email, name, lastname) {
        const user = { id, email, name, lastname };
        this.users.push(user);
        return this.users;
    }
    getUsers() {
        return this.users;
    }
    findUser(id) {
        const user = this.users.filter((user) => { return user.id == id; })[0];
        if (!user) {
            return [];
        }
        return user;
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
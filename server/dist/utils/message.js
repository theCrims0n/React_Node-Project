"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMessage = (name, message, me, messages, chats) => {
    return {
        name, message, date: new Date().getTime(), me: me, messages: messages, chats: chats
    };
};
exports.default = createMessage;
//# sourceMappingURL=message.js.map
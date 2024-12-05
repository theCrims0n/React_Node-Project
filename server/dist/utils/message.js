"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMessage = (name, message, me) => {
    return {
        name, message, date: new Date().getTime(), me: me
    };
};
exports.default = createMessage;
//# sourceMappingURL=message.js.map
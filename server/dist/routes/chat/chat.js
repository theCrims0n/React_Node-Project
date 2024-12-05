"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = __importDefault(require("../../controller/chat/chat"));
const { validateJWT } = require('../../helper/jwt');
const router = (0, express_1.Router)();
router.get('/users', function (req, res) {
    const response = new chat_1.default();
    const result = response.getUsers();
    console.log(result);
    res.json({ result });
});
exports.default = router;
//# sourceMappingURL=chat.js.map
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
exports.deteleteUser = exports.editUser = exports.getUsersById = exports.getUsersPagination = exports.getUsers = void 0;
const users_1 = __importDefault(require("../../schema/users/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.default.findAll();
        if (!result) {
            res.json({ mssge: 'Error' });
            return;
        }
        res.json({ result: result });
    }
    catch (error) {
        res.json({ error: error });
    }
});
exports.getUsers = getUsers;
const getUsersPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { limit, offset } = req.body;
        const result = yield users_1.default.findAll({ limit, offset });
        if (!result) {
            res.json({ mssge: 'Error' });
            return;
        }
        res.json({ result: result });
    }
    catch (error) {
        res.json({ error: error });
    }
});
exports.getUsersPagination = getUsersPagination;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield users_1.default.findByPk(id);
        if (!result) {
            res.json({ mssge: 'Error' });
            return;
        }
        res.json({ result: result });
    }
    catch (error) {
        res.json({ mssge: error });
    }
});
exports.getUsersById = getUsersById;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        let { id, email, name, lastname, password, department } = body;
        console.log(email);
        const userByEmail = yield users_1.default.findOne({ where: { email } });
        if (userByEmail) {
            const { id: idByEmail } = userByEmail;
            if (id != idByEmail) {
                res.status(500).json({ mssge: 'Email currently registered, please use another one.' });
                return;
            }
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        password = hashedPassword;
        const result = yield users_1.default.update({ email, name, lastname, password, department }, { where: { id } });
        res.json({ result });
    }
    catch (error) {
        res.json({ mssge: error });
    }
});
exports.editUser = editUser;
const deteleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { token } = req.cookies;
        const { id: idUser } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (id == idUser) {
            res.status(500).json({ mssge: "You can't delete your own user" });
            return;
        }
        const result = yield users_1.default.destroy({ where: { id } });
        if (!result) {
            res.json({ mssge: 'Error' });
            return;
        }
        const users = yield users_1.default.findAll();
        res.json({ result: users });
    }
    catch (error) {
        res.json({ mssge: error });
    }
});
exports.deteleteUser = deteleteUser;
//# sourceMappingURL=users.js.map
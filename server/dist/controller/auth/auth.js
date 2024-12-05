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
exports.logout = exports.recover = exports.signup = exports.verifyToken = exports.login = void 0;
const users_1 = __importDefault(require("../../schema/users/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../helper/jwt");
const mailer_1 = __importDefault(require("../mailer/mailer"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield users_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ mssge: 'Email or Password incorrect, try again.' });
            return;
        }
        const { id, name, password: passWordUser } = user;
        const validPassword = bcryptjs_1.default.compareSync(password, passWordUser);
        if (!validPassword) {
            res.status(400).json({ mssge: 'Password incorrect, try again.' });
            return;
        }
        const token = yield (0, jwt_1.createJWT)(id, name);
        res.cookie("token", token, {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
            path: '/'
        }).json({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mssge: 'Fatal crash, Please contact the supplier.' });
    }
});
exports.login = login;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.clearCookie('token');
            res.status(401).json({ mssge: 'Invalid or expired token' });
            return;
        }
        const { id } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield users_1.default.findByPk(id);
        if (!user) {
            res.clearCookie('token');
            res.status(401).json({ mssge: 'Unauthorized' });
            return;
        }
        res.json({ user });
    }
    catch (error) {
        console.log(error);
        res.clearCookie('token');
        res.status(401).json({ mssge: 'Token unauthorized' });
        return;
    }
});
exports.verifyToken = verifyToken;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { email, password } = req.body;
        const userExist = yield users_1.default.findOne({ where: { email } });
        if (userExist) {
            res.status(500).json({ mssge: 'Email currently registered, please use another one.' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        body.password = hashedPassword;
        const user = yield users_1.default.create(body);
        res.json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mssge: 'Error with the register process' });
        return;
    }
});
exports.signup = signup;
const recover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const userExist = yield users_1.default.findOne({ where: { email } });
        if (!userExist) {
            res.status(500).json({ mssge: 'This email is not registered.' });
            return;
        }
        const { id } = userExist;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const oldPassword = password;
        password = hashedPassword;
        const user = yield users_1.default.update({ password }, { where: { id } });
        if (user) {
            (0, mailer_1.default)(email, oldPassword);
        }
        res.json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mssge: 'Error with the recovery process' });
        return;
    }
});
exports.recover = recover;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token').status(200).json({ mssge: 'Sucessfully logged out' });
    }
    catch (error) {
        res.status(500).json({ mssge: error });
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.js.map
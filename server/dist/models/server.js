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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const users_1 = __importDefault(require("../routes/users/users"));
const auth_1 = __importDefault(require("../routes/auth/auth"));
const chat_1 = __importDefault(require("../routes/chat/chat"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const chat_2 = __importDefault(require("../controller/chat/chat"));
const message_1 = __importDefault(require("../utils/message"));
class Server {
    constructor() {
        this.apiAuth = '/api/auth';
        this.apiPathUser = '/api/users';
        this.apiPathChat = '/api/chat';
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.server = (0, node_http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, { cors: { origin: 'http://localhost:3000' }, connectionStateRecovery: {} });
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.sockets();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.authenticate().then(() => {
                console.log('DB is running correctly');
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            credentials: true,
            origin: 'https://react-node-project-1-my5f.onrender.com'
            //origin: 'http://localhost:3000'
        }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
        this.app.use((0, cookie_parser_1.default)());
    }
    routes() {
        this.app.use(this.apiAuth, auth_1.default);
        this.app.use(this.apiPathUser, users_1.default);
        this.app.use(this.apiPathChat, chat_1.default);
    }
    sockets() {
        const usersChat = new chat_2.default();
        this.io.on('connection', (socket) => {
            console.log('An user has connected');
            socket.on('enterChat', (user) => {
                if (!user.email) {
                    return;
                }
                usersChat.addUsers(socket.id, user.email, user.name, user.lastname);
            });
            socket.on('createMessage', (data) => {
                const { name, message: oldMessage } = data;
                const message = (0, message_1.default)(name, oldMessage, '');
                socket.broadcast.emit('createMessage', message);
            });
            socket.on('privateMessage', (data) => {
                const user = usersChat.findUser(socket.id);
                const { name } = user;
                const { message, to, from } = data;
                const me = from;
                this.io.to(to).to(socket.id).emit('privateMessage', (0, message_1.default)(name, message, me));
            });
            socket.on('getUsersConnected', () => {
                const result = usersChat.getUsers();
                console.log(result);
                this.io.emit('getUsersConnected', result);
            });
            socket.on('disconnect', () => {
                const user = usersChat.deleteUser(socket.id);
                const { name } = user;
                console.log(`An user has disconnected ${name}`);
            });
            socket.on('chat message', (message) => {
                this.io.emit('chat message', message);
                console.log(message);
            });
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Server is running on port ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
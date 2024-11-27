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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor() {
        this.apiAuth = '/api/auth';
        this.apiPathUser = '/api/users';
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('DB is running correctly');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        //this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
        this.app.use((0, cookie_parser_1.default)());
    }
    routes() {
        this.app.use(this.apiAuth, auth_1.default);
        this.app.use(this.apiPathUser, users_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSocket = void 0;
const socket_io_1 = require("socket.io");
class ServerSocket {
    constructor(server) {
        this.StartListeners = (socket) => {
            socket.on('disconnect', () => {
                console.info('Disconnect received from: ' + socket.id);
            });
            socket.on('connection', () => {
                console.info('Cconnect received from: ' + socket.id);
            });
        };
        ServerSocket.instance = this;
        this.users = {};
        this.io = new socket_io_1.Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });
        this.io.on('connect', this.StartListeners);
    }
}
exports.ServerSocket = ServerSocket;
//# sourceMappingURL=socket.js.map
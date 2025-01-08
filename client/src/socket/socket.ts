import { io } from 'socket.io-client';

const URL = 'https://react-node-project-rqif.onrender.com';

export const socket = io(URL, {
    reconnection: true,
    autoConnect: true,
});
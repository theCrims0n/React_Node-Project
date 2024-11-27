import axios from "axios";

export default axios.create({
    baseURL:  'https://react-node-project-server.vercel.app',
    headers: {
        'Access-Control-Allow-Origin':  'https://react-node-project-client.vercel.app',
        'Access-Control-Max-Age': '1800',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': false
    }, withCredentials: true
})
import axios from "axios";

export default axios.create({
    baseURL: 'https://nodejs-serverless-function-express-al44.onrender.com',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:https://react-node-project-client.vercel.app',
        'Access-Control-Max-Age': '1800',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': false
    }, withCredentials: true
})
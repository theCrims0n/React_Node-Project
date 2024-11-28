import axios from "axios";

export default axios.create({
    baseURL: 'https://nodejs-serverless-function-express-al44.onrender.com',
    ///baseURL: 'http://localhost:3001',
    headers: {
        'Access-Control-Allow-Origin': 'https://react-node-project-client-l5o45bwqd-thecrims0ns-projects.vercel.app',
        'Access-Control-Max-Age': '1800',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': false
    }, withCredentials: true
})
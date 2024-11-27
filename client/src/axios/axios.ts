import axios from "axios";

export default axios.create({
    baseURL: 'react-node-project-zgej.vercel.app',
    headers: {
        'Access-Control-Allow-Origin': 'react-node-project-kappa.vercel.app',
        'Access-Control-Max-Age': '1800',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': false
    }, withCredentials: true
})
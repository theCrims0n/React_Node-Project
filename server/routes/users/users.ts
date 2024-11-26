import { Router } from "express";
import { deteleteUser, editUser, getUsers, getUsersById, getUsersPagination } from "../../controller/users/users";

const { validateJWT } = require('../../helper/jwt')
const router = Router()
if (validateJWT) {
    router.get('/', validateJWT, getUsers)
    router.post('/pagination', validateJWT, getUsersPagination)
    router.get('/:id', validateJWT, getUsersById)
    router.put('/', validateJWT, editUser)
    router.delete('/:id', validateJWT, deteleteUser)
}


export default router
import { Router } from "express";
import { deteleteUser, editUser, getUsers, getUsersById, getUsersPagination } from "../../controller/users/users";
import { validateJWT } from "../../helper/jwt";

const router = Router()

if (validateJWT!) {
    router.get('/', getUsers)
    router.post('/pagination', getUsersPagination)
    router.get('/:id', getUsersById)
    router.put('/', editUser)
    router.delete('/:id', deteleteUser)
}

export default router
import { Router } from "express";
import { deteleteUser, editUser, getUsers, getUsersById } from "../../controller/users/users";

const { validateJWT } = require('../../helper/jwt')
const router = Router()

router.get('/', validateJWT, getUsers)
router.get('/:id', validateJWT, getUsersById)
router.put('/', validateJWT, editUser)
router.delete('/:id', validateJWT, deteleteUser)

export default router
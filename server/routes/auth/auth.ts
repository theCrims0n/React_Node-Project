import { Router } from "express";
import { check } from 'express-validator'
import { login, signup, verifyToken, recover, logout } from "../../controller/auth/auth";

const { validateJWT } = require('../../helper/jwt')
const router = Router()

router.post('/login', check('email', 'Email is required').isEmail(), check('password', 'Password is required').not().isEmpty(), login)
router.get('/verify', verifyToken)
router.post('/signup', signup)
router.put('/recover', recover)
router.get('/logout', logout)

export default router
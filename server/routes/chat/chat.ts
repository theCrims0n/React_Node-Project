import { Router } from "express";
import Chat from "../../controller/chat/chat";
import { Request, Response } from "express"

const { validateJWT } = require('../../helper/jwt')
const router = Router()

router.get('/users', function (req: Request, res: Response) {
    const response = new Chat();

    const result: any = response.getUsers()
    console.log(result)
    res.json({result});
})

export default router
import { Request, Response } from "express"
import usersSchema from "../../schema/users/users"
import jwt from 'jsonwebtoken'
import bscrypt from 'bcryptjs'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersSchema.findAll()
        if (!result) {
            res.json({ mssge: 'Error' })
            return
        }
        res.json({ result: result })

    } catch (error) {
        res.json({ error: error })
    }
}

export const getUsersPagination = async (req: Request, res: Response) => {
    try {
        let { limit, offset }: any = req.body

        const result = await usersSchema.findAll({ limit, offset })

        if (!result) {
            res.json({ mssge: 'Error' })
            return
        }
        res.json({ result: result })

    } catch (error) {
        res.json({ error: error })
    }
}

export const getUsersById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const result: any = await usersSchema.findByPk(id)
        if (!result) {
            res.json({ mssge: 'Error' })
            return
        }
        res.json({ result: result })

    } catch (error) {
        res.json({ mssge: error })
    }
}

export const editUser = async (req: Request, res: Response) => {
    try {

        const { body } = req
        let { id, email, name, lastname, password, department, role_id } = body
        const userByEmail: any = await usersSchema.findOne({ where: { email } })

        if (userByEmail) {

            const { id: idByEmail } = userByEmail

            if (id != idByEmail) {
                res.status(500).json({ mssge: 'Email currently registered, please use another one.' })
                return
            }
        }

        const hashedPassword = await bscrypt.hash(password, 10)
        password = hashedPassword

        const result = await usersSchema.update({ email, name, lastname, password, department, role_id }, { where: { id } })

        res.json({ result })

    } catch (error) {
        res.json({ mssge: error })
    }
}

export const deteleteUser = async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const { token } = req.cookies;

        const { id: idUser }: any = jwt.verify(token, process.env.SECRET_KEY!)

        if (id == idUser) {
            res.status(500).json({ mssge: "You can't delete your own user" })
            return
        }

        const result: any = await usersSchema.destroy({ where: { id } })
        if (!result) {
            res.json({ mssge: 'Error' })
            return
        }
        const users = await usersSchema.findAll()
        res.json({ result: users })

    } catch (error) {
        res.json({ mssge: error })
    }
}


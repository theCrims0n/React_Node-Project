import { Request, Response } from "express"
import usersSchema from "../../schema/users/users"
import jwt from 'jsonwebtoken'
import bscrypt from 'bcryptjs'
import { createJWT } from "../../helper/jwt"
import sendEmail from "../mailer/mailer"

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        const user: any = await usersSchema.findOne({ where: { email } })
        if (!user) {
            res.status(400).json({ mssge: 'Email or Password incorrect, try again.' })
            return
        }

        const { id, name, password: passWordUser } = user

        const validPassword = bscrypt.compareSync(password, passWordUser)

        if (!validPassword) {
            res.status(400).json({ mssge: 'Password incorrect, try again.' })
            return
        }

        const token: any = await createJWT(id, name)

        res.cookie("token", token, {
            domain: 'react-node-project-1-my5f.onrender.com',
            path: '/',
            sameSite: 'none',
            maxAge: 3600000,
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production' ? true : false,
        }).json({ user, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mssge: 'Fatal crash, Please contact the supplier.' })
    }
}

export const verifyToken = async (req: Request, res: Response) => {
    try {

        const { token } = req.cookies
        if (!token) {
            res.clearCookie('token')
            res.status(401).json({ mssge: 'Invalid or expired token' })
            return
        }

        const { id }: any = jwt.verify(token, process.env.SECRET_KEY!)

        const user = await usersSchema.findByPk(id)

        if (!user) {
            res.clearCookie('token')
            res.status(401).json({ mssge: 'Unauthorized' })
            return
        }
        res.json({ user })
        return

    }
    catch (error) {
        console.log(error)
        res.clearCookie('token')
        res.status(401).json({ mssge: 'Token unauthorized' })
        return
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const { email, password } = req.body
        const userExist = await usersSchema.findOne({ where: { email } })
        if (userExist) {
            res.status(500).json({ mssge: 'Email currently registered, please use another one.' })
            return
        }
        const hashedPassword = await bscrypt.hash(password, 10)
        body.password = hashedPassword

        const user = await usersSchema.create(body)
        res.json({ user })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ mssge: 'Error with the register process' })
        return
    }
}

export const recover = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body
        const userExist = await usersSchema.findOne({ where: { email } })
        if (!userExist) {
            res.status(500).json({ mssge: 'This email is not registered.' })
            return
        }
        const { id }: any = userExist
        const hashedPassword = await bscrypt.hash(password, 10)
        const oldPassword = password;
        password = hashedPassword
        const user = await usersSchema.update({ password }, { where: { id } })
        if (user) {
            sendEmail(email, oldPassword)
        }
        res.json({ user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ mssge: 'Error with the recovery process' })
        return
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token').status(200).json({ mssge: 'Sucessfully logged out' })

    } catch (error) {
        res.status(500).json({ mssge: error })

    }
}



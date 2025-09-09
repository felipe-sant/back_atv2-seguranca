import { Request, Response } from 'express'
import getErrorMessage from '../utils/getMessageError'
import UserService from '../services/User.service'
import UserType from '../types/User.type'
import sanitizeHTML from 'sanitize-html';
import { encrypt } from '../utils/crypto';

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async register(req: Request, res: Response) {
        try {
            const { username, password } = req.body
            if (!username || !password) {
                res.status(400).json({ message: "username or password is required" })
                return
            }

            const user: UserType = { username: username, password: password }

            await this.userService.createUser(user)

            res.status(200).json({message: "Usuário criado com sucesso!"})
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }

    async __test__(_: Request, res: Response) {
        try {
            const result = await this.userService.__test__()
            res.status(200).json(result)
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }
}

export default UserController
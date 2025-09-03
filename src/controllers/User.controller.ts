import { Request, Response } from 'express'
import getErrorMessage from '../utils/getMessageError'
import UserService from '../services/User.service'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
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
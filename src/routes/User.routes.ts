import { Router } from 'express'
import UserController from '../controllers/User.controller'

const router = Router()
const userController = new UserController()

router.get(
    '/user',
    userController.__test__.bind(userController)
)

const userRouter = router
export default userRouter
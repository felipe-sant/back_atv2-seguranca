import { Router } from 'express'
import UserController from '../controllers/User.controller'

const router = Router()
const userController = new UserController()

router.post(
    '/user/register',
    userController.register.bind(userController)
)

router.get(
    '/user',
    userController.__test__.bind(userController)
)

const userRouter = router
export default userRouter
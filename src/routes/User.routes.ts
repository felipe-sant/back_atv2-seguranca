import { Router } from 'express'
import UserController from '../controllers/User.controller'
import { requireAuthMiddleware } from '../middlewares/requireAuth.middleware'

const userRouter = Router()
const userController = new UserController()

userRouter.post(
    '/register',
    userController.register.bind(userController)
)

userRouter.post(
    '/login',
    userController.login.bind(userController)
)

userRouter.post(
    '/logout',
    requireAuthMiddleware,
    userController.logout.bind(userController)
)

userRouter.post(
    '/refresh',
    userController.refresh.bind(userController)
)

userRouter.get(
    '/',
    requireAuthMiddleware,
    userController.getProfile.bind(userController)
)

export default userRouter
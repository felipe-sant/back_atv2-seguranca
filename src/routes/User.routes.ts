import { Router } from 'express'
import UserController from '../controllers/User.controller'
import { requireAuthMiddleware } from '../middlewares/requireAuth.middleware'

const router = Router()
const userController = new UserController()

router.post(
    '/user/register',
    userController.register.bind(userController)
)

router.post(
    '/user/login',
    userController.login.bind(userController)
)

router.post(
    '/user/logout',
    requireAuthMiddleware,
    userController.logout.bind(userController)
)

router.post(
    '/user/refresh',
    userController.refresh.bind(userController)
)

router.get(
    '/user',
    requireAuthMiddleware,
    userController.__test__.bind(userController)
)

const userRouter = router
export default userRouter
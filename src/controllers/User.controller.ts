import { Request, Response } from 'express'
import getErrorMessage from '../utils/getMessageError'
import UserService from '../services/User.service'
import UserType from '../types/User.type'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'
import RefreshTokenService from '../services/RefreshToken.service'

class UserController {
    private userService: UserService
    private refreshTokenService: RefreshTokenService

    constructor() {
        this.userService = new UserService()
        this.refreshTokenService = new RefreshTokenService()
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

            res.status(200).json({ message: "Usuário criado com sucesso!" })
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body
            if (!username || !password) {
                res.status(400).json({ message: "username or password is required" })
                return
            }

            const userLogin = { username: username, password: password }

            const response: { isLogged: boolean, user?: UserType, message?: string } = await this.userService.checkLogin(userLogin)

            if (response.message) {
                res.status(401).json({ message: response.message })
                return
            }

            if (response.isLogged && response.user) {
                const payload = { sub: username.id, username }
                const accessToken = generateAccessToken(payload)
                const refreshToken = generateRefreshToken(payload)

                await this.refreshTokenService.saveRefreshToken(refreshToken)

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })

                return res.status(200).json({ accessToken })
            } else {
                res.status(401).json({ message: "Login not authorized!" })
            }
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken

            if (!refreshToken) return res.status(401).json({ message: "No refresh token" })

            const valid = await this.refreshTokenService.isRefreshTokenValid(refreshToken)
            if (!valid) return res.status(401).json({ message: "Invalid refresh token" })

            const payload = verifyRefreshToken(refreshToken)

            // remove exp e iat do payload
            const { exp, iat, ...cleanPayload } = payload

            const newAccessToken = generateAccessToken(cleanPayload)

            return res.json({ accessToken: newAccessToken })
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }


    async logout(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken

            if (refreshToken) await this.refreshTokenService.revokeToken(refreshToken)

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })

            return res.sendStatus(204)
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
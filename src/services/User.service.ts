import UserType from "../types/User.type";
import db from "../db"
import hashPassword from "../utils/hashPassword";
import { encrypt, decrypt } from "../utils/crypto";
import checkPassword from "../utils/checkPassword";

class UserService {
    async createUser(user: UserType) {
        user.username = encrypt(user.username)
        user.password = await hashPassword(user.password)

        const query = "INSERT INTO users (username, password) VALUES ($1, $2)"
        await db.query(query, [user.username, user.password])
    }

    async checkLogin(userLogin: UserType): Promise<{ isLogged: boolean, user?: UserType, message?: string }> {
        userLogin.username = encrypt(userLogin.username)

        const query = "SELECT * FROM users WHERE username = ($1)"
        const result = await db.query(query, [userLogin.username])

        const user: UserType | undefined = result.rows[0]
        if (!user) {
            return { isLogged: false, message: "Username not found!" }
        }

        const isCorretPassword = await checkPassword(userLogin.password, user.password)

        if (isCorretPassword) {
            return { isLogged: true, user: user }
        } else {
            return { isLogged: false, message: "Password is incorrect!" }
        }
    }

    async getInfo(user: UserType) {

    }

    async __test__() {
        const query = "SELECT * FROM users"
        const result = await db.query(query)
        return { count: result.rowCount, rows: result.rows }
    }
}

export default UserService
import UserType from "../types/User.type";
import db from "../db"
import hashPassword from "../utils/hashPassword";
import { encrypt, decrypt } from "../utils/crypto";

class UserService {
    async createUser(user: UserType) {
        user.username = encrypt(user.username)
        user.password = await hashPassword(user.password)

        const query = "INSERT INTO users (username, password) VALUES ($1, $2)"
        const result = await db.query(query, [user.username, user.password])
    }

    async getInfo(user: UserType) {

    }

    async __test__() {
        const query = "SELECT * FROM users WHERE id = 1"
        const result = await db.query(query)
        const user = result.rows[0] as UserType
        user.username = decrypt(user.username)
        return user
    }
}

export default UserService
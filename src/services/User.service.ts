import UserType from "../types/User.type";
import db from "../db"
import hashPassword from "../utils/hashPassword";
import { encrypt, decrypt } from "../utils/crypto";

class UserService {
    async createUser(user: UserType) {
        user.username = encrypt(user.username)
        user.password = await hashPassword(user.password)

        const query = "INSERT INTO users (username, password) VALUES ($1, $2)"
        await db.query(query, [user.username, user.password])
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
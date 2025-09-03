import UserType from "../types/User.type";
import db from "../db"

class UserService {
    async createUser(user: UserType) {

    }

    async __test__() {
        const query = "SELECT * FROM users"
        const result = await db.query(query)
        return { count: result.rowCount, rows: result.rows }
    }
}

export default UserService
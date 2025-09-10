import db from "../db"
import { encrypt } from "../utils/crypto"

class RefreshTokenService {
    async saveRefreshToken(token: string): Promise<void> {
        const encriptedToken = encrypt(token)
        console.log(token)
        // console.log(encriptedToken)
        const query = "INSERT INTO tokens (token) VALUES ($1)"
        await db.query(query, [encriptedToken])
    }

    async revokeToken(token: string): Promise<void> {
        const query = "DELETE FROM tokens WHERE token = $1"
        await db.query(query, [token])
    }

    async isRefreshTokenValid(token: string): Promise<boolean> {
        const encriptedToken = encrypt(token)
        console.log(token)
        // console.log(encriptedToken)
        const query = "SELECT 1 FROM tokens WHERE token = $1"
        const result = await db.query(query, [encriptedToken])
        if (result.rowCount) {
            return result.rowCount > 0
        } else {
            return false
        }
    }
}

export default RefreshTokenService

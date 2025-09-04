import bcrypt from "bcrypt"

async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
}

export default hashPassword
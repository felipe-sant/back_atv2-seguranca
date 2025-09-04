import bcrypt from "bcrypt"

async function checkPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}

export default checkPassword
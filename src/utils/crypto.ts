import crypto from "crypto";

const PASSWORD = process.env.AES_PASSWORD || "my-password";
const SALT = process.env.AES_SALT || "my-salt";

const key = crypto.pbkdf2Sync(PASSWORD, SALT, 100000, 32, "sha256");

const FIXED_IV = new Uint8Array(16);

function encrypt(text: string): string {
    const cipher = crypto.createCipheriv("aes-256-cbc", new Uint8Array(key), FIXED_IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

function decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipheriv("aes-256-cbc", new Uint8Array(key), FIXED_IV);
    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

export { encrypt, decrypt };

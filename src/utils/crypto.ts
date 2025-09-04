import crypto from "crypto";

const PASSWORD = process.env.AES_PASSWORD || "my-password";

const SALT = process.env.AES_SALT || "my-salt";

const key = crypto.pbkdf2Sync(PASSWORD, SALT, 100000, 32, "sha256");

function encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        new Uint8Array(key),
        new Uint8Array(iv)
    );
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return iv.toString("base64") + ":" + encrypted;
}

function decrypt(encryptedData: string): string {
    const [ivString, encryptedText] = encryptedData.split(":");
    const ivBuffer = Buffer.from(ivString, "base64");
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        new Uint8Array(key),
        new Uint8Array(ivBuffer)
    );
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

export { encrypt, decrypt }
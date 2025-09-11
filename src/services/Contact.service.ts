import ContactType from "../types/Contact.type";
import { encrypt, decrypt } from "../utils/crypto";
import db from "../db"

class ContactService {
    async createContact(contactData: ContactType) {
        contactData.name = encrypt(contactData.name)
        contactData.phone = encrypt(contactData.phone)

        const query = "INSERT INTO contacts (user_id, name, phone) VALUES ($1, $2, $3)"
        await db.query(query, [contactData.user_id, contactData.name, contactData.phone])
    }

    async readContact(user_id: number) {
        const query = "SELECT name, phone FROM contacts WHERE user_id = ($1)"
        const result = await db.query(query, [user_id])

        const contacts: ContactType[] = result.rows

        contacts.forEach(c => {
            c.name = decrypt(c.name)
            c.phone = decrypt(c.phone)
        })

        return contacts
    }
}

export default ContactService
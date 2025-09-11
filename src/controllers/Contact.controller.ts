import { Response } from "express";
import getErrorMessage from "../utils/getMessageError";
import AuthRequest from "../types/interfaces/AuthRequest";
import ContactService from "../services/Contact.service";
import ContactType from "../types/Contact.type";

class ContactController {
    private contactService: ContactService

    constructor() {
        this.contactService = new ContactService()
    }

    async newContact(req: AuthRequest, res: Response) {
        try {
            const user = req.user
            if (!user) {
                throw new Error("Error in user")
            }

            const { name, phone } = req.body
            if (!name || !phone) {
                res.status(400).json({ message: "name or phone is required" })
                return
            }

            const contact: ContactType = {
                user_id: user.sub,
                name: name,
                phone: phone
            }

            await this.contactService.createContact(contact)

            res.status(200).json({ message: "Contact created successfully!" })
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }

    async getContacts(req: AuthRequest, res: Response) {
        const user = req.user
        if (!user) {
            throw new Error("Error in user")
        }

        const contacts = await this.contactService.readContact(user.sub)

        res.status(200).json({ contacts: contacts})
    }
}

export default ContactController
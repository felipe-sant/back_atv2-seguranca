import { Router } from "express";
import { requireAuthMiddleware } from '../middlewares/requireAuth.middleware'
import ContactController from "../controllers/Contact.controller";

const contactRouter = Router()
const contactController = new ContactController()

contactRouter.post(
    '/',
    requireAuthMiddleware,
    contactController.newContact.bind(contactController)
)

contactRouter.get(
    '/',
    requireAuthMiddleware,
    contactController.getContacts.bind(contactController)
)

export default contactRouter
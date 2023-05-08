import { Router } from "express";
import {
    createNewContactController,
    deleteContactsController,
    listContactsByIdController,
    listContactsController,
    updatedContactsController,
} from "../controllers/contacts.controlle";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactsRoutes = Router();

contactsRoutes.get("", ensureAuthMiddleware, listContactsController);
contactsRoutes.get("/:id", ensureAuthMiddleware, listContactsByIdController);
contactsRoutes.post("", ensureAuthMiddleware, createNewContactController);
contactsRoutes.patch("/:id", ensureAuthMiddleware, updatedContactsController);
contactsRoutes.delete("/:id", ensureAuthMiddleware, deleteContactsController);

export default contactsRoutes;

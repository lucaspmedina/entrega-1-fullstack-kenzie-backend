import { Request, Response } from 'express';
import { IContactRequest, IContactUpdate } from '../interfaces/contacts';
import { createNewContactService } from '../services/contacts/createContact.service';
import { deleteContactService } from '../services/contacts/deleteContact.service';
import { listContactByIdService } from '../services/contacts/listContactById.service';
import { listContactsService } from '../services/contacts/listContacts.service';
import { updateContactService } from '../services/contacts/updateContact.service';

const createNewContactController = async (
    request: Request,
    response: Response
) => {
    const sentData: IContactRequest = request.body;
    const clientId: string = request.clients.id;
    console.log(clientId)
    const newClientData = await createNewContactService(sentData, clientId);
    return response.status(201).json(newClientData);
};

const listContactsController = async (request: Request, response: Response) => {
    const allContacts = await listContactsService();
    return response.json(allContacts);
};

const listContactsByIdController = async (
    request: Request,
    response: Response
) => {
    const contactId = request.params.id;
    const contact = await listContactByIdService(contactId);
    return response.status(200).json(contact);
};

const updatedContactsController = async (
    request: Request,
    response: Response
) => {
    const contactId = request.params.id;
    const sentData: IContactUpdate = request.body;
    const updatedContact = await updateContactService(sentData, contactId);
    return response.status(200).json(updatedContact);
};

const deleteContactsController = async (
    request: Request,
    response: Response
) => {
    const id = request.params.id;
    await deleteContactService(id);
    return response.status(204).json();
};

export {
    createNewContactController,
    listContactsController,
    listContactsByIdController,
    updatedContactsController,
    deleteContactsController,
};

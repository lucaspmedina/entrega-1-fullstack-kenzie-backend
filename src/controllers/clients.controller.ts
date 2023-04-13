import { Request, Response } from 'express';
import { IClientUpdate, IClientsRequest } from '../interfaces/clients';
import createNewClientService from '../services/clients/createClient.service';
import listClientsService from '../services/clients/listClients.service';
import updateClientService from '../services/clients/updateClient.service';
import { deleteClientService } from '../services/clients/deleteClient.service';

const listClientsController = async (request: Request, response: Response) => {
    const allClients = await listClientsService();
    return response.status(200).json(allClients);
};

const createNewClientController = async (
    request: Request,
    response: Response
) => {
    const sentData: IClientsRequest = request.body;
    const newClientData = await createNewClientService(sentData);
    return response.status(201).json(newClientData);
};

const updateClientsController = async (
    request: Request,
    response: Response
) => {
    const sentData: IClientUpdate = request.body;
    const clientId = request.params.id;
    const updatedClient = await updateClientService(sentData, clientId);
    return response.status(200).json(updatedClient);
};

const deleteClientController =async (request:Request, response: Response) => {
    const clientId = request.params.id;
    const deleteClient = await deleteClientService(clientId)
    return response.status(204).json(deleteClient)
    
}

export {
    listClientsController,
    createNewClientController,
    updateClientsController,
    deleteClientController,
};

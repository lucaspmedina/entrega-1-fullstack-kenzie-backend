import { AppDataSource } from '../../data-source';
import { Cliente } from '../../entities/clients/clients.entity';
import { IClientsResponse } from '../../interfaces/clients';
import { listResponseClientsSchema } from '../../schemas/clients.schemas';

const listClientsService = async (): Promise<IClientsResponse[]> => {
    const clientsRepository = AppDataSource.getRepository(Cliente);
    const allClientes = await clientsRepository.find();

    const responseClients = await listResponseClientsSchema.validate(
        allClientes,
        {
            stripUnknown: true,
        }
    );
    return responseClients;
};

export default listClientsService
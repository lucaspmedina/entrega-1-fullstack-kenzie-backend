import { AppDataSource } from '../../data-source';
import { Cliente } from '../../entities/clients/clients.entity';
import { AppError } from '../../errors/app.errors';
import { IClientUpdate, IClientsResponse } from '../../interfaces/clients';
import { clientsWhitNoPasswordSchema } from '../../schemas/clients.schemas';

const updateClientService = async (
    data: IClientUpdate,
    clientId: string
): Promise<IClientsResponse> => {
    const clientsRepository = AppDataSource.getRepository(Cliente);
    const foundClientId = await clientsRepository.findOneBy({ id: clientId });

    if (!foundClientId) {
        throw new AppError('Client not found', 404);
    }

    const updatedUser = clientsRepository.create({
        ...foundClientId,
        ...data,
    });
    await clientsRepository.save(updatedUser);

    const updatedResponse = await clientsWhitNoPasswordSchema.validate(
        updatedUser,
        {
            stripUnknown: true,
        }
    );
    return updatedResponse;
};

export default updateClientService;

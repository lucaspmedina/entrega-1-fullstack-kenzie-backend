import { hashSync } from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { Cliente } from '../../entities/clients/clients.entity';
import { AppError } from '../../errors/app.errors';
import { IClientsRequest } from '../../interfaces/clients';
import { clientsWhitNoPasswordSchema } from '../../schemas/clients.schemas';

const createNewClientService = async ({
    name,
    email,
    phone,
    password,
}: IClientsRequest) => {
    const clientsRepository = AppDataSource.getRepository(Cliente);

    const emailAlreadyExists = await clientsRepository.findOneBy({ email });
    if (emailAlreadyExists) {
        throw new AppError('This email already exists in database', 400);
    }

    const checkIfPhoneExists = await clientsRepository.findOneBy({ phone });
    if (checkIfPhoneExists) {
        throw new AppError('This phone already exists in database', 400);
    }

    const newClient = new Cliente();
    newClient.name = name;
    newClient.email = email;
    newClient.phone = phone;
    newClient.password = hashSync(password, 12);

    const createdNewClient = clientsRepository.create(newClient);
    await clientsRepository.save(createdNewClient);

    const returnedClient = await clientsWhitNoPasswordSchema.validate(
        createdNewClient,
        {
            stripUnknown: true,
        }
    );
    return returnedClient;
};

export default createNewClientService;
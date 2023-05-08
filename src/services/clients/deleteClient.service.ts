import { AppDataSource } from '../../data-source';
import { Cliente } from '../../entities/clients/clients.entity';
import { AppError } from '../../errors/app.errors';

const deleteClientService = async (idUser: string) => {
    const userRepository = AppDataSource.getRepository(Cliente);

    const findUser = await userRepository.findOneBy({ id: idUser });

    if (!findUser) {
        throw new AppError('User not found', 404);
    }

    const deletedUser = await userRepository.delete(idUser);
    return deletedUser;
};

export { deleteClientService };

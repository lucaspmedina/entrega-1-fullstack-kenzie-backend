import { AppDataSource } from '../../data-source';
import { Contato } from '../../entities/contacts/contacts.entity';
import { AppError } from '../../errors/app.errors';

const deleteContactService = async (clientId: string) => {
    const contactRepository = AppDataSource.getRepository(Contato);
    const foundContact = await contactRepository.findOneBy({ id: clientId });

    if (!foundContact) {
        throw new AppError('Contact not found!', 404);
    }

    await contactRepository.remove(foundContact);

    return true;
};

export { deleteContactService };

import { AppDataSource } from '../../data-source';
import { Contato } from '../../entities/contacts/contacts.entity';
import { AppError } from '../../errors/app.errors';

const listContactByIdService = async (contactId: string) => {
    const contactRepository = AppDataSource.getRepository(Contato);

    const foundContactId = await contactRepository.findOneBy({
        id: contactId,
    });

    if (!foundContactId) {
        throw new AppError('Contact not found', 404);
    }
    return foundContactId;
};

export { listContactByIdService };

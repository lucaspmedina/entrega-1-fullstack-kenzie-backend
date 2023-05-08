import { AppDataSource } from '../../data-source';
import { Contato } from '../../entities/contacts/contacts.entity';
import { AppError } from '../../errors/app.errors';
import { IContact, IContactUpdate } from '../../interfaces/contacts';

const updateContactService = async (
    sentData: IContactUpdate,
    contactId: string
): Promise<IContact> => {
    const contactRepository = AppDataSource.getRepository(Contato);
    const foundContact = await contactRepository.findOneBy({ id: contactId });

    if (!foundContact) {
        throw new AppError('Contact not found', 404);
    }

    const updatedContact = contactRepository.create({
        ...foundContact,
        ...sentData,
    });

    return updatedContact;
};

export { updateContactService };

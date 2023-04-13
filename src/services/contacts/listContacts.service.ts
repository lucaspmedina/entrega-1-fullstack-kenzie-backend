import { AppDataSource } from '../../data-source';
import { Contato } from '../../entities/contacts/contacts.entity';
import { IContact } from '../../interfaces/contacts';

const listContactsService = async (): Promise<IContact[]> => {
    const contactRepository = AppDataSource.getRepository(Contato);
    const allContacts = await contactRepository.find();

    return allContacts;
};

export { listContactsService };

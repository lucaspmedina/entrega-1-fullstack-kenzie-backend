import { AppDataSource } from '../../data-source';
import { Cliente } from '../../entities/clients/clients.entity';
import { Contato } from '../../entities/contacts/contacts.entity';
import { IContactRequest } from '../../interfaces/contacts';
import { clientsWhitNoPasswordSchema } from '../../schemas/clients.schemas';

const createNewContactService = async (
    data: IContactRequest,
    clientId: string
) => {
    console.log("id", clientId)
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const contactRepository = AppDataSource.getRepository(Contato);

    const foundClient = await clienteRepository.findOneBy({ id: clientId });
    console.log("cliente", foundClient)


    const newContact = contactRepository.create({
        ...data,
        clients: foundClient!,
    });
    await contactRepository.save(newContact);

    const returnedContact = await clientsWhitNoPasswordSchema.validate(
        newContact,
        {
            stripUnknown: true,
        }
    );

    return returnedContact;
};

export { createNewContactService };

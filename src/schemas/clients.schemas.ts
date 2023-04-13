import * as yup from 'yup';
import { IClients, IClientsRequest } from '../interfaces/clients';

const clientsSchema: yup.SchemaOf<IClientsRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    password: yup.string().required(),
});

const clientsWhitNoPasswordSchema: yup.SchemaOf<IClients> = yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    phone: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
});

const listResponseClientsSchema = yup.array(clientsWhitNoPasswordSchema);

export {
    clientsSchema,
    clientsWhitNoPasswordSchema,
    listResponseClientsSchema,
};

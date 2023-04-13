import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../data-source';
import { Cliente } from '../../entities/clients/clients.entity';
import { AppError } from '../../errors/app.errors';
import { IClientLogin, IClienteLoginResponse } from '../../interfaces/clients';
import { clientsWhitNoPasswordSchema } from '../../schemas/clients.schemas';

const clientLoginService = async ({
    email,
    password,
}: IClientLogin): Promise<IClienteLoginResponse> => {
    const clientsRepository = AppDataSource.getRepository(Cliente);

    const foundClient = await clientsRepository.findOneBy({ email: email });

    if (!foundClient) {
        throw new AppError('Email/password combination invalid', 403);
    }

    const checkPassword = await compare(password, foundClient.password);
    if (!checkPassword) {
        throw new AppError('Email/password combination invalid', 403);
    }

    const token = jwt.sign(
        { email: foundClient.email },
        process.env.SECRET_KEY!,
        {
            subject: foundClient.id,
            expiresIn: '24h',
        }
    );

    const responseClient = await clientsWhitNoPasswordSchema.validate(
        foundClient,
        {
            stripUnknown: true,
        }
    );

    return { responseClient, token };
};

export default clientLoginService;

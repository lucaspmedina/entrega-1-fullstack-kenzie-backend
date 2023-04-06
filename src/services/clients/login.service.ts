import { compare } from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { Cliente } from '../../entities/clients/clients.entity';
import { AppError } from '../../errors/app.errors';
import { IClientLogin } from '../../interfaces/clients';

const newClientLoginService = async ({
    email,
    password,
}: IClientLogin): Promise<string> => {

    const clientsRepository = AppDataSource.getRepository(Cliente);
    const foundClient = await clientsRepository.findOneBy({email:email})
    if (!foundClient){
        throw new AppError("Email/password combination invalid", 403);      
    }

    const checkPassword = await compare(password, foundClient.password)
    if(!checkPassword){
        throw new AppError("Email/password combination invalid", 403);      
    }

    const sentData = {
        email: foundClient.email
    }

    const secretKey = process.env.SECRET_KEY
};

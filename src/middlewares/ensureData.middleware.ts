import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { AppDataSource } from '../data-source';
import { Cliente } from '../entities/clients/clients.entity';
import { AppError } from '../errors/app.errors';

const ensureDataMiddleware =
    (schema: yup.AnySchema) =>
    async (request: Request, response: Response, next: NextFunction) => {
        const validateData = await schema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const userRepository = AppDataSource.getRepository(Cliente);
        const ensureClientExists = await userRepository.findOneBy({
            email: validateData.email,
        });

        if (ensureClientExists) {
            throw new AppError('User already exists.', 409);
        }
        next();
    };

export { ensureDataMiddleware };

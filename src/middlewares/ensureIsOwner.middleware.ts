import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.errors';

const ensureIsOwnerMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.clients;

    if (id !== request.params.id) {
        throw new AppError('Not authorized', 401);
    }
    return next();
};

export { ensureIsOwnerMiddleware };

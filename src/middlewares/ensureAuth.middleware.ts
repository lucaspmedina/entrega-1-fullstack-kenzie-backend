import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const ensureAuthMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let token = request.headers.authorization;

    if (!token) {
        return response.status(401).json({
            message: 'Invalid token',
        });
    }

    token = token.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
        if (error) {
            return response.status(401).json({
                message: error.message,
            });
        }

        request.clients = {
            id: String(decoded.sub),
        };

        return next();
    });
};

export default ensureAuthMiddleware;

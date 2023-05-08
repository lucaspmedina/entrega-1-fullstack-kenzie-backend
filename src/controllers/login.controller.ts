import { Request, Response } from 'express';
import clientLoginService from '../services/clients/login.service';

const loginClientsController = async (req: Request, res: Response) => {
    const loginData = req.body;
    const client = await clientLoginService(loginData);
    return res
        .status(200)
        .json({ user: client.responseClient, token: client.token });
};

export { loginClientsController };

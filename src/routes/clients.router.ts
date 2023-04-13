import { Router } from 'express';
import {
    createNewClientController,
    deleteClientController,
    listClientsController,
    updateClientsController,
} from '../controllers/clients.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import { ensureDataMiddleware } from '../middlewares/ensureData.middleware';
import { ensureIsOwnerMiddleware } from '../middlewares/ensureIsOwner.middleware';
import { clientsSchema } from '../schemas/clients.schemas';

const clientsRouter = Router();

clientsRouter.get('', ensureAuthMiddleware, listClientsController);

clientsRouter.post(
    '',
    ensureDataMiddleware(clientsSchema),
    createNewClientController
);

clientsRouter.patch('/:id', ensureAuthMiddleware,/* ensureIsOwnerMiddleware, */ updateClientsController);

clientsRouter.delete(
    '/:id',
    ensureAuthMiddleware,
/*     ensureIsOwnerMiddleware,
 */    deleteClientController
);

export default clientsRouter;

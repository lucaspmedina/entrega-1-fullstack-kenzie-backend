import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { errorHandler } from './errors/app.errors';
import clientsRouter from './routes/clients.router';
import contactsRouter from './routes/contacts.router';
import { loginRouter } from './routes/login.router';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);

app.use('/clients', clientsRouter);

app.use('/contacts', contactsRouter);

app.use(errorHandler);

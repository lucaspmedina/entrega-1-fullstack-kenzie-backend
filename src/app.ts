import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { errorHandler } from './errors/app.errors';

export const app = express();

app.use(express.json());

app.use('/login',);

app.use('/contacts',);

app.use('/clients',);

app.use(errorHandler);

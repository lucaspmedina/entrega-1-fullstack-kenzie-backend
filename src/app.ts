import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { errorIdentify } from './errors/app.errors';

export const app = express();

app.use(express.json());

app.use('/login');

app.use('/message');

app.use('/products');

app.use(errorIdentify);

import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Cliente } from '../src/entities/clients/clients.entity';
import { Contato } from './entities/contacts/contacts.entity';

import 'dotenv/config';
import 'reflect-metadata';

import { createClientsTables1680492702123 } from './migrations/1680492702123-createClientsTables';

const AppDataSource = new DataSource(
    process.env.NODE_ENV == 'test'
        ? {
              type: 'sqlite',
              database: ':memory:',
              synchronize: true,
              entities: ['src/entities/*.ts'],
          }
        : {
              type: 'postgres',
              host: process.env.PGHOST,
              database: process.env.PGDATABASE,
              username: process.env.PGUSER,
              password: process.env.PGPASSWORD,
              port: parseInt(process.env.PGPORT),
              synchronize: false,
              logging: true,
              entities: [Cliente, Contato],
              migrations: [createClientsTables1680492702123],
          }
);

export { AppDataSource };
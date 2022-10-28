import { DataSource } from 'typeorm';
import {Odd} from "./entities/odd.entity";

export const oddProviders = [
    {
        provide: 'ODD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Odd),
        inject: ['DATA_SOURCE'],
    },
];
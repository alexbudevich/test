import { DataSource } from 'typeorm';
import {Round} from "./entities/round.entity";

export const roundProviders = [
    {
        provide: 'ROUND_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Round),
        inject: ['DATA_SOURCE'],
    },
];
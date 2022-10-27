import { DataSource } from 'typeorm';
import {Season} from "./entities/season.entity";

export const seasonProviders = [
    {
        provide: 'SEASON_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Season),
        inject: ['DATA_SOURCE'],
    },
];
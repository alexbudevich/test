import { DataSource } from 'typeorm';
import {League} from "./entities/league.entity";

export const leagueProviders = [
    {
        provide: 'LEAGUE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(League),
        inject: ['DATA_SOURCE'],
    },
];